const config = {
  title: 'Mikhail Bezrukov',
  tagline: 'Senior Technical Writer',
  url: 'https://mikhail-bezrukov-tw.github.io',
  baseUrl: '/technical-writing-portfolio-en/',
  organizationName: 'mikhail-bezrukov-tw',
  projectName: 'technical-writing-portfolio-en',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  presets: [
    ['classic', {
      docs: false,
      blog: false,
      theme: {customCss: require.resolve('./src/css/custom.css')},
    }],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Portfolio',
      items: [
        {to:'/documentation', label:'Documentation Samples', position:'right'},
        {to:'/case-studies', label:'Case Studies', position:'right'},
        {href:'/technical-writing-portfolio-en/#about', label:'About', position:'right'},
        {href:'https://mikhail-bezrukov-tw.github.io/technical-writing-portfolio-en/mikhail-bezrukov-cv.pdf', label:'CV', position:'right'},
      ],
    },
  },
};
module.exports = config;
