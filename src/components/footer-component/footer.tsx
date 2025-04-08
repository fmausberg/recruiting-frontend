const Footer = () => {
  return (
    <footer className="bg-footer-background shadow-lg mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Linke Spalte */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-footer-text">Recruitingtests</h3>
            <p className="text-sm text-footer-text">
              Recruitingtests - Projekt in Testphase
            </p>
          </div>

          {/* Mittlere Spalte */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-footer-text">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/home" className="hover:text-footer-hover text-footer-text">Home</a></li>
              <li><a href="/test" className="hover:text-footer-hover text-footer-text">Test</a></li>
            </ul>
          </div>

          {/* Rechte Spalte */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-footer-text">Kontakt</h3>
            <ul className="space-y-2 text-footer-text">
              <li>Email: felix@mausberg.net</li>
              <li>Tel: +4915221886204</li>
              <li>Adresse: Breite Straße 33a, 41460 Neuss</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-footer-text">
            © {new Date().getFullYear()} Jana Nagel, Lennard Tappe, Felix Mausberg. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
