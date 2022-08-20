import facebook from "../public/img/Facebook.svg";
import linkedIn from "../public/img/linkedin.svg";
import instragram from "../public/img/instagram.svg";

let FotterInfor = [
  // item 1
  [
    {
      title: "Services",

      name: "Photography",
      path: "/products/photography",
    },

    {
      name: "Cinematography",
      path: "/products/cinematography",
    },
    {
      name: "Decoration",
      path: "/products/decoration",
    },
    {
      name: "Printing & Press",
      path: "/products/printing-press",
    },
    {
      name: "Gift Items",
      path: "/products/gift-items",
    },
    {
      name: "DJ/Musician",
      path: "/products/dj-musician",
    },
    {
      name: "Mehedi Artist",
      path: "/products/mehedi-artist",
    },
    {
      name: "Makeup Artist",
      path: "/products/makeup-artist",
    },
    {
      name: "Brand Promoter",
      path: "/products/brand-promoter",
    },
    {
      name: "Rental",
      path: "/products/rental",
    },
  ],
  // item 2

  [
    {
      title: "About",
      name: "About Us",
      path: "/about-us",
    },
    {
      name: "Career",
      path: "/career",
    },
    {
      name: "News",
      path: "/news",
    },
  ],
  // item 3

  [
    {
      title: "Support",
      name: "Contact Us",
      path: "/contact-us",
    },
    {
      name: "Docs",
      path: "/docs",
    },
    {
      name: "FAQ",
      path: "/faq",
    },
  ],
  // item 4

  [
    {
      title: "Get in touch",
      path: "/", //important don't delete
      button: "Install app",
      getIn: [
        {
          text: "team.eventizer@gmail.com",
          name: "Email:",
          path: "mailto:team.eventizer@gmail.com",
        },
        {
          name: "Mobile:",
          path: "tel:+8801764-940535",
          text: "+8801764-940535",
        },
      ],

      social: [
        {
          img: facebook,
          path: "https://www.facebook.com/eventizer.bd/",
        },
        {
          img: linkedIn,
          path: "https://www.linkedin.com/company/eventizer-bd",
        },

        {
          img: instragram,
          path: "https://instagram.com/eventizer.bd",
        },
      ],
    },
  ],
];

export default FotterInfor;
