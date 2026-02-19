import { Box, Button, Container, Link, SpaceBetween } from "@cloudscape-design/components";

function ProductCard({
  title,
  logo,
  description,
}: {
  title: string;
  logo: string;
  description: string;
}) {
  return (
    <li className="product-cards-list-item" aria-label={title}>
      <Container>
        <img src={logo} alt={`${title} logo`} width="50" height="50" />
        <SpaceBetween direction="vertical" size="s">
          <SpaceBetween direction="vertical" size="xxs">
            <Box variant="h3">
              <Link fontSize="inherit">{title}</Link>
            </Box>
          </SpaceBetween>
          <Box variant="p">{description}</Box>
          <Button ariaLabel={`Shop now for ${title}`}>View demo</Button>
          <Box variant="p"><br/></Box>
        </SpaceBetween>
      </Container>
      <br/>
    </li>
  );
}

export default ProductCard;