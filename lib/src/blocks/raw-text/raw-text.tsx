import * as React from "react";

export interface RawTextProps {
  attributes?: any;
  text?: string;
}

function RawText(props: RawTextProps) {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: props.text?.toString() || "" }}
      className={props.attributes.className}
    />
  );
}

export default RawText;
