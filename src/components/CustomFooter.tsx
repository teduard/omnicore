//import * as React from "react";
import { Box, SpaceBetween, ColumnLayout, Link } from "@cloudscape-design/components";

import "./CustomFooter.css";

export default function CustomFooter() {
  
    return(
    <footer>
    <Box
      tagOverride="footer"
      padding={{ top: "xl", bottom: "l", horizontal: "l" }}
      variant="div"
      //style={{ borderTop: "1px solid var(--color-border-divider-default)" }}
    >
      <SpaceBetween size="xxl">
        {/* Main Content: Links and Info */}
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

        {/* Bottom Section: Legal & Copyright */}
        <Box //border={{ top: "default" }} padding={{ top: "m" }}
        >
          <SpaceBetween className="copyright" direction="horizontal" size="l">
            <Box variant="small" color="text-body-secondary">
              <span>© 2026 OmniCore</span>
              <span>|</span> 
              <span>All rights reserved.</span>
            </Box>
            <Link variant="secondary" href="#">Privacy Policy</Link>
            <Link variant="secondary" href="#">Terms of Service</Link>
          </SpaceBetween>
        </Box>
      </SpaceBetween>
    </Box>
    </footer>
//     return ( <>
//      <footer>
//                 <ul>
//                     <li>
//                         <a href="/about/about-cloudscape/">About</a>
//                     </li>
//                     <li>
//                         <a href="/about/connect/">Connect</a>
//                     </li>
//                     <li>
//                         <a href="https://aws.amazon.com/privacy/" target="_blank" rel="noopener noreferrer">
//                             Privacy
                    
//                             <span className="external-link" aria-label="(opens new tab)" role="img">
                               
                        
//                             </span></a></li>
// <li>
//     <a href="https://aws.amazon.com/terms/" target="_blank" rel="noopener noreferrer">
//         Site terms
                    
       
//     </a>
// </li>
// <li>
//     <a role="button" >Cookie preferences</a>
// </li>
// <li>© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved.
//                 </li>
// </ul>

// </footer>
// </>
  );
}