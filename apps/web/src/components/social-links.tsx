export type SocialLinkItem = {
  label: string;
  href: string;
};

type SocialLinksProps = {
  items: readonly SocialLinkItem[];
  label: string;
};

export function SocialLinks({ items, label }: SocialLinksProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {items.map((item) => {
          const external = item.href.startsWith("http");

          return (
            <li key={`${item.label}-${item.href}`}>
              <a
                href={item.href}
                className="link-quiet font-mono text-meta uppercase"
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
