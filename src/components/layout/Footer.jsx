import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

const COLUMNS = [
  {
    title: 'Catalogue',
    links: [
      { label: 'All titles', to: '/explore' },
      { label: 'Highest rated', to: '/explore?sort=rating' },
      { label: 'Most reviewed', to: '/explore?sort=reviews' },
      { label: 'Newest first', to: '/explore?sort=recent' },
    ],
  },
  {
    title: 'Your shelf',
    links: [
      { label: 'Books you have read', to: '/my-books' },
      { label: 'This year’s goal', to: '/my-books' },
      { label: 'Create an account', to: '/signin' },
    ],
  },
];

const Footer = () => (
  <footer className="mt-auto border-t border-rule bg-paper">
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-14">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-end gap-2.5">
            <span className="mb-1 block h-5 w-[3px] bg-accent" aria-hidden="true" />
            <span className="font-display text-[22px] font-medium leading-none text-ink">Folio</span>
          </div>
          <p className="mt-4 max-w-[26ch] text-[13px] leading-relaxed text-ink-2">
            A reading catalogue for people who finish what they start.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title}>
            <h3 className="label">{column.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-ink-2 transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h3 className="label">Elsewhere</h3>
          <div className="mt-4 flex gap-4">
            {[
              { icon: FiGithub, label: 'GitHub' },
              { icon: FiTwitter, label: 'Twitter' },
              { icon: FiInstagram, label: 'Instagram' },
            ].map((social) => {
              const SocialIcon = social.icon;
              return (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="text-ink-2 transition-colors duration-200 hover:text-accent"
                >
                  <SocialIcon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-2 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">© 2026 Folio</p>
        <p className="label">Set in Fraunces &amp; Instrument Sans</p>
      </div>
    </div>
  </footer>
);

export default Footer;
