import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataSourceContext } from "../contexts/DataSourceContext";
import { useDatabase } from "../db/hooks/useDatabase";
import type {
  NewCategoryPayload,
  UpdateCategoryPayload,
  DeleteCategoryPayload,
} from "../services/types";
import { useNotificationStore } from "./useNotificationStore";

export const CATEGORY_KEYS = {
  all: () => ["categories"] as const,
  byId: (id: number) => ["categories", id] as const,
};

export const useCategories = () => {
  const { categoryService } = useContext(DataSourceContext);
  const { isReady } = useDatabase();

  return useQuery({
    queryKey: CATEGORY_KEYS.all(),
    queryFn: () => categoryService.getCategories(),
    enabled: isReady,
    staleTime: Infinity,
  });
};

export const useGetCategoryById = (categoryId: number) => {
  const { categoryService } = useContext(DataSourceContext);
  const { isReady } = useDatabase();

  return useQuery({
    queryKey: CATEGORY_KEYS.byId(categoryId),
    queryFn: () => categoryService.getCategoryById(categoryId),
    enabled: isReady && categoryId > 0,
    staleTime: Infinity,
  });
};

export const useAddCategory = () => {
  const { categoryService } = useContext(DataSourceContext);
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((s) => s.addNotification);

  return useMutation({
    mutationFn: (payload: NewCategoryPayload) =>
      categoryService.addCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all() });
      addNotification({
        type: "success",
        title: "Category added",
        message: "Your new category was saved.",
      });
    },
    onError: () => {
      addNotification({
        type: "error",
        title: "Failed to add category",
        message: "Something went wrong. Please try again.",
      });
    },
  });
};

export const useUpdateCategory = () => {
  const { categoryService } = useContext(DataSourceContext);
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((s) => s.addNotification);

  return useMutation({
    mutationFn: (payload: UpdateCategoryPayload) =>
      categoryService.updateCategory(payload),
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all() });
      queryClient.invalidateQueries({
        queryKey: CATEGORY_KEYS.byId(payload.categoryId),
      });
      addNotification({
        type: "success",
        title: "Category updated",
        message: "Your changes were saved.",
      });
    },
    onError: () => {
      addNotification({
        type: "error",
        title: "Failed to update category",
        message: "Something went wrong. Please try again.",
      });
    },
  });
};

export const useDeleteCategory = () => {
  const { categoryService } = useContext(DataSourceContext);
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((s) => s.addNotification);

  return useMutation({
    mutationFn: (payload: DeleteCategoryPayload) =>
      categoryService.deleteCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all() });
      addNotification({
        type: "success",
        title: "Category deleted",
        message: "The category was removed.",
      });
    },
    onError: () => {
      addNotification({
        type: "error",
        title: "Failed to delete category",
        message: "Something went wrong. Please try again.",
      });
    },
  });
};
