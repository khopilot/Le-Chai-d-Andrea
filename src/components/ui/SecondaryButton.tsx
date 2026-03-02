interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
}

interface SecondaryLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as: "a";
  href: string;
}

type Props = SecondaryButtonProps | SecondaryLinkProps;

const baseClasses =
  "inline-block border border-or/50 bg-transparent px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-or no-underline transition-[border-color,background-color] duration-300 hover:border-or hover:bg-or/[0.08]";

export default function SecondaryButton(props: Props) {
  if (props.as === "a") {
    const { as, className, ...rest } = props;
    return <a className={`${baseClasses} ${className ?? ""}`} {...rest} />;
  }
  const { as, className, ...rest } = props as SecondaryButtonProps;
  return <button className={`${baseClasses} ${className ?? ""}`} {...rest} />;
}
