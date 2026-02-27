import {
  BreadcrumbGroup,
  type BreadcrumbGroupProps,
} from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";

interface IAppBreadcrumbsProps {
  items: Array<BreadcrumbGroupProps.Item>;
}

function AppBreadcrumbs(props: IAppBreadcrumbsProps) {
  const navigate = useNavigate();
  return (
    <BreadcrumbGroup
      items={props.items}
      expandAriaLabel="Show path"
      ariaLabel="Breadcrumbs"
      onFollow={(event) => {
        // 1. Check if it's an internal link
        if (!event.detail.external) {
          // 2. Stop the browser from reloading the page
          event.preventDefault();

          const finalHref = event.detail.href.replace(
            import.meta.env.BASE_URL,
            "/",
          );

          // 3. Let React Router handle the URL change
          navigate(finalHref);
        }
      }}
    />
  );
}
export default AppBreadcrumbs;
