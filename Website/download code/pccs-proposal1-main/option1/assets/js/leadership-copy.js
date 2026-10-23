(function () {
  if (document.documentElement.lang === 'zh-CN') return;
  var bios = {
    "Piong Yew Peng": [
      "Mr Piong Yew Peng is currently serving as the Senior Independent Non-Executive Chairman of the Board of PCCS Group Bhd.",
      "He completed his Bachelor of Business (Accounting) in University of RMIT, Australia. He is a member of the Malaysian Institute of Accountants and a fellow member of CPA Australia.",
      "He has thirty (30) years of experience in providing audit and accounting services to wide range of clients.",
      "He is a Director of public companies, namely The Pay Fong School Berhad and Premier Pay Fong Foundation. He also represents The Malacca Chinese Chamber of Commerce and Industry to serve as a Director of Memorial Venture Berhad."
    ],
    "Chan Wee Kiang": [
      "Mr. David Chan Wee Kiang is currently serving as the Group Managing Director of the Board of PCCS Group Bhd.",
      "He completed his Bachelor of Commerce (Accounting and Finance) Degree in Monash University (Clayton Campus), Melbourne, Australia.",
      "At 2002, he joined and started his career at Perusahaan Chan Choo Sing Sdn. Bhd. as a Marketing Executive. He is then subsequently promoted as Marketing Manager in the year 2003.",
      "In 2007, Mr. Chan Wee Kiang was appointed as Group Marketing Manager and subsequently promoted as Deputy Group General Manager in 2008."
    ],
    "Chan Wee Boon": [
      "Mr. Edmund Chan Wee Boon is currently serving as the Executive Director of the Board of PCCS Group Bhd.",
      "He completed his Bachelor of Civil Engineering, Monash University (Clayton Campus), Melbourne Australia.",
      "At 2004, he joined and started his career at Blopak China Private Ltd. as a Project Manager. He then moved to Guangdong Haohe Construction Pte.Ltd. and held the position as Marketing Manager from 2005-2007.",
      "He later joined Trio Paper Mill Sdn. Bhd. as an Assistant General Manager and finally joined Mega Lebals & Stickers Sdn. Bhd at 2010 as the General Manager. He was subsequently promoted as Group General Manager in 2014."
    ],
    "Chan Chow Tek": [
      "Mr. Chan Chow Tek is currently serving as a Non-Executive Non-Independent Director.",
      "He has previously served as the Executive Director at PCCS Group Bhd from June 21, 1995 to November 2, 2020. He leads all the marketing activities in the Group and has more than 30 years of experience in textile and apparel marketing and merchandising.",
      "He started his career in 1973 in marketing the products of Chan Trading to local departmental stores. In 1981, he made the first export order for the company. He is also responsible for the development and growth of the Group’s garment business.",
      "His job includes keeping abreast with the latest development in the apparel and fashion industry by frequent overseas trips to identify new and potential markets. He was appointed to the board of HRB on April 8, 1997 and also sits on the board of several private limited companies."
    ],
    "Dato’ Chan Chor Ngiak": [
      "Dato’ Chan Chor Ngiak serves as Non-Independent Non-Executive Director at PCCS Group Bhd since June 21, 1995.",
      "He started his career in 1980 assisting his father and brothers in marketing the products of Chan Trading to local departmental stores. Dato’ Chan Chor Ngiak is currently the Managing Director of HRB.",
      "He was appointed to the Board of HRB on April 8, 1997. He became directly involved with Harta when he took up the position as Marketing Manager. He was subsequently promoted to the position of Managing Director of HRB in May 1999, overseeing the Group’s packaging business.",
      "Throughout his career in the industry, he has continually established connections with many business executives in the Chamber of Commerce and Associations. He is the Honorary Chairman of the Chinese Chamber of Commerce in Batu Pahat, the Chairman of the Chinese Association in Parit Raja, Batu Pahat, the Vice-Chairman of the Chinese Association in Johor State and a Committee Member of the Malaysian Corrugated Carton Manufacturers’ Association.",
      "He also sits on the board of several private limited companies. He is a member of the Audit Committee, Remuneration Committee and Nomination Committee of PCCS."
    ],
    "Chan Chor Ang": [
      "Mr. Chan Chor Ang serves as Non-Independent Non-Executive Director at PCCS Group Bhd since June 21, 1995.",
      "He joined PCCSSB in 1981 and was transferred to Jusca Garments Sdn. Bhd. as the Factory Manager in 1985. He has more than 25 years of experience in the textile and garment industry.",
      "He is currently the Executive Director of HRB and was appointed to the Board of HRB on April 8, 1997. He was assigned to Harta as the Factory Manager in 1990.",
      "He later took charge of the training on production management, machine maintenance and productivity enhancement under various expatriate Technical Advisors from Hong Kong, Taiwan and China. He is currently the Executive Director Cum General Manager of Harta Packaging Industries Sdn. Bhd. He also sits on the board of several private limited companies."
    ],
    "Joyce Wong Ai May": [
      "Ms Wong Ai May (Joyce) was appointed to the Board of PCCS Group Berhad on 2 November 2020. She is the Chairperson of the Audit Committee and Nomination Committee and a member of the Remuneration Committee.",
      "She holds a Bachelor of Commerce in Accounting and Finance from the University of Tasmania, Australia. She is a member of the Malaysian Institute of Accountants, a Corporate Member of the Institute of Internal Auditors Malaysia and a Fellow of CPA Australia.",
      "She began her career with Smith Zain Securities Sdn. Bhd. as an Accounts Executive in 1999 and became Head of Finance at the Penang Branch of BBMB Securities Sdn. Bhd. in 2002. She joined Hwang-DBS Securities Berhad in 2004 and subsequently pursued a career in professional services before establishing JWC Consulting Sdn. Bhd., where she currently serves as Managing Director.",
      "She also serves on the Industry Advisory Panel of the School of Business at DISTED College, Penang and is an Independent Director of Caritas Malaysia. She currently serves as an Independent Non-Executive Director of Edelteq Holdings Berhad, 3REN Berhad and FoundPac Group Berhad."
    ],
    "Tang Lai Huat": [
      "Dr. Tang Lai Huat was appointed Financial Controller of PCCS Group Berhad on 1 September 2016 and Corporate Controller on 1 March 2018. He leads the Corporate Office and the Group’s finance and accounting functions, including policy execution and strategic deployment across credit, medical equipment and new business.",
      "He holds doctorate degrees in Business Administration, a Master of Public Administration and an EMBA from Tsinghua University, a further EMBA from City University of Hong Kong, an MBA, the ACCA qualification and an executive certificate in financial strategies for cross-border expansion from Harvard Business School and Peking University.",
      "Dr. Tang began his career in audit and management consultancy, later held senior finance and operations roles in manufacturing and at LimKokWing University, and joined PCCS in 2012. He also serves as Vice Chairman of Chung De Classics Education Association Malaysia and sits on the boards of private companies, including Faire Berhad.",
      "He has no family relationship with any Director or major shareholder of PCCS, no conflicts of interest with PCCS, and no relevant convictions, sanctions or penalties during the financial year ended 31 March 2026."
    ]
  };

  window.PCCS_LEADER_BIOS = bios;

  document.querySelectorAll(".leader-card[data-leader-name]").forEach(function (card) {
    var name = card.getAttribute("data-leader-name");
    if (bios[name]) card.dataset.leaderBio = bios[name].join(" ");
  });
}());
