import * as React from "react";

interface Props {
  cssCode?: string;
  customFonts?: CustomFont[];
  contentId?: string;
}

import InlinedStyles from "../../inlined-styles";
import type { CustomFont } from "./styles.helpers.js";
import { getCss } from "./styles.helpers.js";
import { getFontCss } from "./styles.helpers.js";

function ContentStyles(props: Props) {
  const injectedStyles = `
${getCss({
  cssCode: props.cssCode,
  contentId: props.contentId,
})}
${getFontCss({
  customFonts: props.customFonts,
})}

.builder-text > p:first-of-type, .builder-text > .builder-paragraph:first-of-type {
  margin: 0;
}
.builder-text > p, .builder-text > .builder-paragraph {
  color: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  font-weight: inherit;
  font-size: inherit;
  text-align: inherit;
  font-family: inherit;
}
`.trim();

  return <InlinedStyles styles={injectedStyles} />;
}

export default ContentStyles;