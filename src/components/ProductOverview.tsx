import {
  Box,
  Container,
  Header,
  Link,
  SpaceBetween,
  TextContent,
} from "@cloudscape-design/components";

interface IProductOverviewProps {
  title: string;
  image: string;
}

function ProductOverview(props: IProductOverviewProps) {
  return (
    <section className="page-section" aria-label="Product overview">
      <Header variant="h2">
        <span id="product-overview">{props.title}</span>
      </Header>
      <SpaceBetween size="m">
        <div>
          <Box variant="p">
            A high-performance, local-first financial tracking engine built to
            manage complex personal cash flows.
          </Box>
          <Box variant="p">
            Unlike standard "to-do" style expense trackers, this module utilizes
            a relational SQLite core to provide real-time aggregation,
            categorical filtering, and multi-dimensional data visualization.
          </Box>
        </div>

        <div>
          <Box variant="h3" margin={{ bottom: "xs" }}>
            Product details
          </Box>
        </div>

        <Box margin={{ top: "xs" }}>
          <Container
            media={{
              content: (
                <Link href="#">
                  {/* <img src={videoThumbnail} alt="Video thumbnail" /> */}
                  <img src={props.image} width={120} alt="Expense" />
                </Link>
              ),
            }}
          >
            <SpaceBetween direction="vertical" size="xxs">
              <Box variant="small">2 min</Box>
              <Box variant="h2" tagOverride="h3">
                <Link fontSize="heading-m" href="#">
                  Expense demo
                </Link>
              </Box>
            </SpaceBetween>
          </Container>
        </Box>

        <div>
          <Header variant="h3">Highlights</Header>
          <TextContent>
            <ul>
              <li>
                Real-time spending breakdowns using Cloudscape Pie and Bar
                charts, driven by live SQL views.
              </li>
              <li>
                Integrated split-button layouts for quick-entry, bulk-deletion,
                and CSV data exportation.
              </li>
              <li>
                Multi-step modal workflows for adding expenses, featuring
                complex validation and keyboard-first navigation.
              </li>
            </ul>
          </TextContent>
        </div>
        <hr />
      </SpaceBetween>
    </section>
  );
}

export default ProductOverview;
