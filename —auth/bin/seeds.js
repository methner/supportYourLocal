const mongoose = require('mongoose');
const Business = require('../models/Business');
const Voucher = require('../models/Voucher');

mongoose.connect('mongodb://localhost/auth', {
  useNewUrlParser: true
});

const businesses = [
  {
    companyName: "Victoria Met Albert",
    description:
      "Victoria met Albert, concept stores in Prenzlauer Berg & Friedrichshain, inspired by the love of the English queen and her German husband, stocks a charming selection of fashion, accessories and homeware - 'for the woman who has everything and the man who needs nothing'.",
    contact: {
      phone: "(0)30 2977 4366",
      address: "KROSSENER STRASSE 9-10, 10245 Berlin",
      email: "shop@victoriametalbert.com",
      website: "www.victoriametalbert.com",
    },
    username: 'vic_and_al',
    password: '',
    avatar: "",
    role: 'admin',
    voucher: [],
    products: [{name: "", imageUrl: ""}]
  },
 
{
    companyName: "hAusen",
    description:
      "We have a lot of Scandinavian home design, products from well-known manufacturers and small newcomers. From pillows and blankets, decoration, to small furniture and lamps, we have put together our range with a lot of passion for you.",
    contact: {
      phone: "030 - 983 544 10",
      address: "Krossener Str. 25 /10245 Berlin",
      email: "post@hausen-berlin.de",
      website: "https://www.hausen-berlin.de/",
    },
    username: 'hausen',
	password: '',
	avatar: "",
	role: 'admin',
	voucher: [],
	products: [{name: "", imageUrl: ""}]
  },
{
    companyName: "BUCHBOX!",
    description:
      "Our BOOKBOX! sees itself as a literary meeting place and as a well-stocked bookshop in the Kiez. We don't just want to sell books, we want to bring literature to life, inspire and enchant our customers. Meetings with authors and encounters with music, film and art create experiences in bookstores that cannot be found on the Internet.",
    contact: {
      phone: "	030 / 20 07 82 43",
      address: "Grünberger Straße 68, 10245 Berlin",
      email: "boxikiez@buchboxberlin.de",
      website: "https://www.buchboxberlin.de/",
    },
    username: 'buchbox',
	password: '',
	avatar: "",
	role: 'admin',
	voucher: [],
	products: [{name: "", imageUrl: ""}]
  },

{
    companyName: "Lord of Socks",
    description:
      "There are many sock producers but there is only one Lord of Socks. Since our start in summer 2013 we have committed us to offer our customers high quality and best designs to fair prices. We combine Italian sock manufacturing expertise with British style influenced by the multi-cultural background of our home town.",
    contact: {
      phone: "	030 / 544 817 24",
      address: "10709 Berlin",
      email: "contact@lordofsocks.com",
      website: "https://www.lordofsocks.com/",
    },
    username: 'lordofsocks',
	password: '',
	avatar: "",
	role: 'admin',
	voucher: [],
	products: [{name: "", imageUrl: ""}]
},
{
    companyName: "kadó Liquorice Shop",
    description:
      "We create all liquorice mixtures by hand, as we do with our online orders as well. We advise liquorice fans, and all who want to become one. Here we welcome our guests to Liquorice Tastings 4 times a year.",
    contact: {
      phone: "030-69041638",
      address: "Graefestrasse 20, 10967 Berlin-Kreuzberg",
      email: "info@kado.de",
      website: "https://kado.de/de/",
    },
    username: 'kado',
	password: '',
	avatar: "",
	role: 'admin',
	voucher: [],
	products: [{name: "", imageUrl: ""}]
}
];


// businesses.forEach(business => {
//   Voucher.create(business.voucher).then(dbVoucher => {
//     business.voucher = dbVoucher._id;
//     Business.create(business);
//   });
// });
Business.insertMany(businesses).then(data => {

  // const salt = bcrypt.genSaltSync();
  // console.log(salt);
  // const hash = bcrypt.hashSync(password, salt);

  console.log("successfully inserted");
  mongoose.connection.close();
}).catch(err => {
  console.log(err);
})
