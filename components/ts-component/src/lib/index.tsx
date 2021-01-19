import React from "react";

export interface TsComponentProps extends React.ComponentPropsWithoutRef<"h1"> {
  name: string;
}

export const TsComponent: React.VFC<TsComponentProps> = ({ name, ...rest }) => {
  return <h1 {...rest}>{name}</h1>;
};
