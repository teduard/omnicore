import Box from "@cloudscape-design/components/box";
import Grid from "@cloudscape-design/components/grid";
import "./HeroHeader.css";

function AboutHeader() {
  return (
    <Box data-testid="hero-header" padding={{ top: "xs", bottom: "l" }}>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 6, s: 7 } },
          { colspan: { default: 12, xs: 6, s: 5 } },
        ]}
      >
        <div>
          <Box variant="awsui-value-large">
            <br />
            About <span className="gradient">OmniCore</span>
          </Box>
          <Box
            variant="h2"
            color="text-body-secondary"
            margin={{ top: "xxs", bottom: "s" }}
          >
            <br />
            In an era of fragmented apps and scattered data, OmniCore provides a
            unified ecosystem for personal operations.
            <br />
            <br />
            Designed with the precision of industrial software, our suite
            bridges the gap between professional-level data management and daily
            life.
          </Box>
        </div>
      </Grid>

      <Box
        variant="h2"
        color="text-body-secondary"
        margin={{ top: "xxs", bottom: "s" }}
      >
        Unified Interface: A single, cohesive design language (Cloudscape) that
        reduces cognitive load.
      </Box>

      <Box
        variant="h2"
        color="text-body-secondary"
        margin={{ top: "xxs", bottom: "s" }}
      >
        Actionable Intelligence: Moving beyond mere "logging" to provide
        real-time, SQL-driven insights.
      </Box>

      <Box
        variant="h2"
        color="text-body-secondary"
        margin={{ top: "xxs", bottom: "s" }}
      >
        Total Ownership: Your data remains in your browser, under your control,
        at all times.
      </Box>
    </Box>
  );
}

export { AboutHeader };
