import appExpense from '/assets/expense.jpg';
import appTaskify from '/assets/taskify2.png';
import appFitness from '/assets/fitness.svg';
import { Box } from "@cloudscape-design/components";
import ProductCard from "./ProductCars";

function RelatedProducts() {
  return (
    <section className="page-section" aria-label="Related products and services">
      <Box variant="h2" margin={{ bottom: 'm' }}>
        <span id="related-products">OmniCore products</span>
      </Box>
      <ul className="product-cards-list">
        <ProductCard
          title="Expense"
          logo={appExpense}
          description="Have an overview of all your important KPIs, alarms, and other metrics at a quick glance. This dashboard experience let's you make decisions quickly."
        />
        <ProductCard
          title="Fitness"
          logo={appFitness}
          description="Distributing your data is just as important as keeping it secure. Our data protection offering includes all types of industry standard mechanisms."
        />
        <ProductCard
          title="Taskify"
          logo={appTaskify}
          description="Distributing your data is just as important as keeping it secure. Our data protection offering includes all types of industry standard mechanisms."
        />
      </ul>
    </section>
  );
}

export default RelatedProducts;