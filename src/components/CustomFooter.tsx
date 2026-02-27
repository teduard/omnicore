import { Box, SpaceBetween, Link } from "@cloudscape-design/components";

import "./CustomFooter.css";

export default function CustomFooter() {
  return (
    <footer>
      <Box
        tagOverride="footer"
        padding={{ top: "xl", bottom: "l", horizontal: "l" }}
        variant="div"
      >
        <SpaceBetween size="xxl">
          {/* <ColumnLayout columns={3} variant="text-grid">
          <SpaceBetween size="s">
            <Box variant="h3">Screenshot API</Box>
            <Link href="#">Features</Link>
            <Link href="#">Pricing</Link>
          </SpaceBetween>
          
          <SpaceBetween size="s">
            <Box variant="h3">Resources</Box>
            <Link href="#">Documentation</Link>
            <Link href="#">API Reference</Link>
            <Link href="#">Free tools</Link>
          </SpaceBetween>

          <SpaceBetween size="s">
            <Box variant="h3">Connect</Box>
            <Link href="#">Contact Us</Link>
            <Link href="#">Support</Link>
          </SpaceBetween>
        </ColumnLayout> */}

          <Box>
            <SpaceBetween className="copyright" direction="horizontal" size="l">
              <Box variant="small" color="text-body-secondary">
                <span>© 2026 OmniCore</span>
                <span>|</span>
                <span>All rights reserved.</span>
              </Box>
              <Link variant="secondary" href="#">
                Privacy Policy
              </Link>
              <Link variant="secondary" href="#">
                Terms of Service
              </Link>
            </SpaceBetween>
          </Box>
        </SpaceBetween>
      </Box>
    </footer>
  );
}
