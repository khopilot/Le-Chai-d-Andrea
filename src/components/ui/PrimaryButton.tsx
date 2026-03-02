interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
}

interface PrimaryLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as: "a";
  href: string;
}

type Props = PrimaryButtonProps | PrimaryLinkProps;

const baseClasses =
  "inline-block cursor-pointer border-none bg-or px-[2.2rem] py-[0.9rem] font-jost text-[0.62rem] uppercase tracking-[0.3em] text-noir no-underline transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-or-p hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]";

export default function PrimaryButton(props: Props) {
  if (props.as === "a") {
    const { as, className, ...rest } = props;
    return <a className={`${baseClasses} ${className ?? ""}`} {...rest} />;
  }
  const { as, className, ...rest } = props as PrimaryButtonProps;
  return <button className={`${baseClasses} ${className ?? ""}`} {...rest} />;
}
