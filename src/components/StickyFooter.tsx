import {
  Box,
  Link,
} from '@cloudscape-design/components';

import '@cloudscape-design/global-styles/index.css';
import '../styles/base.scss';
import '../App.css'

const FOOTER_HEIGHT = 50; // px — adjust to match your footer's actual height


function StickyFooter() {
  return (
    <footer id="app-footer"
      style={{
        background: '#eee',
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: FOOTER_HEIGHT,
        zIndex: 1000,
        //backgroundColor: "var(--color-background-container-content)",
        //borderTop: "1px solid var(--color-border-divider-default)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "0 24px",
      }}
    >
      <Link href="/about" variant="secondary">About</Link>
      <Link href="/privacy" variant="secondary" external>Privacy</Link>
      <Link href="/terms" variant="secondary" external>Site terms</Link>
      
      <Box color="text-body-secondary" fontSize="body-s">
        © 2026, OmniCore
      </Box>
    </footer>
  );
}

export default StickyFooter;