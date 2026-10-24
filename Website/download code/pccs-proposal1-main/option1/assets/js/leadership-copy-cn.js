(function () {
  if (document.documentElement.lang !== 'zh-CN') return;

  var bios = {
    "Piong Yew Peng": [
      "Piong Yew Peng 现任 PCCS 集团有限公司董事会高级独立非执行主席。",
      "他毕业于澳大利亚 RMIT University，获商业（会计）学士学位，是马来西亚会计师协会会员及澳洲注册会计师公会资深会员。",
      "他拥有三十年为各类客户提供审计及会计服务的经验。",
      "他担任 The Pay Fong School Berhad 及 Premier Pay Fong Foundation 董事，并代表马六甲中华总商会担任 Memorial Venture Berhad 董事。"
    ],
    "Chan Wee Kiang": [
      "David Chan Wee Kiang 现任 PCCS 集团有限公司董事会集团董事总经理。",
      "他毕业于澳大利亚墨尔本 Monash University Clayton 校区，获商业（会计与金融）学士学位。",
      "2002 年，他加入 Perusahaan Chan Choo Sing Sdn. Bhd.，担任市场主管，随后于 2003 年晋升为市场经理。",
      "2007 年，Chan Wee Kiang 获委任为集团市场经理，并于 2008 年晋升为副集团总经理。"
    ],
    "Chan Wee Boon": [
      "Edmund Chan Wee Boon 现任 PCCS 集团有限公司董事会执行董事。",
      "他毕业于澳大利亚墨尔本 Monash University，获土木工程学士学位。",
      "2004 年，他加入 Blopak China Private Ltd. 担任项目经理，随后转至 Guangdong Haohe Construction Pte. Ltd.，于 2005 至 2007 年担任市场经理。",
      "之后，他加入 Trio Paper Mill Sdn. Bhd. 担任助理总经理，并于 2010 年加入 Mega Lebals & Stickers Sdn. Bhd. 担任总经理，随后于 2014 年晋升为集团总经理。"
    ],
    "Chan Chow Tek": [
      "Chan Chow Tek 现任非独立非执行董事。",
      "他曾于 1995 年 6 月 21 日至 2020 年 11 月 2 日期间担任 PCCS 集团有限公司执行董事，负责集团所有市场营销活动，并在纺织及服装市场营销与商品经营方面拥有超过 30 年经验。",
      "他于 1973 年开始职业生涯，负责将 Chan Trading 的产品推广至本地百货公司。1981 年，他为公司取得首张出口订单，并负责推动集团成衣业务的发展与壮大。",
      "他的工作包括通过频繁出访海外，掌握服装及时尚行业的最新发展，以发掘新市场及潜在市场。他于 1997 年 4 月 8 日获委任为 HRB 董事，并担任多家私人有限公司董事。"
    ],
    "Dato’ Chan Chor Ngiak": [
      "Dato’ Chan Chor Ngiak 自 1995 年 6 月 21 日起担任 PCCS 集团有限公司非独立非执行董事。",
      "他于 1980 年开始职业生涯，协助父亲及兄弟将 Chan Trading 的产品推广至本地百货公司。目前，Dato’ Chan Chor Ngiak 担任 HRB 董事总经理。",
      "他于 1997 年 4 月 8 日获委任为 HRB 董事，并在担任市场经理后直接参与 Harta 的业务，随后于 1999 年 5 月晋升为 HRB 董事总经理，负责集团包装业务。",
      "在行业职业生涯中，他持续与商会及协会的众多企业管理人员建立联系。他是峇株巴辖中华总商会名誉主席、Parit Raja 华人协会主席、柔佛州华人协会副主席，以及马来西亚瓦楞纸箱制造商协会委员会委员。",
      "他也担任多家私人有限公司董事，并是 PCCS 审计委员会、薪酬委员会及提名委员会成员。"
    ],
    "Chan Chor Ang": [
      "Chan Chor Ang 自 1995 年 6 月 21 日起担任 PCCS 集团有限公司非独立非执行董事。",
      "他于 1981 年加入 PCCSSB，并于 1985 年调任 Jusca Garments Sdn. Bhd. 担任厂长，在纺织及成衣行业拥有超过 25 年经验。",
      "他目前担任 HRB 执行董事，并于 1997 年 4 月 8 日获委任为 HRB 董事。他于 1990 年调任 Harta 担任厂长。",
      "随后，他在来自香港、台湾及中国的多名外籍技术顾问指导下，负责生产管理、机器维护及生产力提升培训。目前，他担任 Harta Packaging Industries Sdn. Bhd. 执行董事兼总经理，并担任多家私人有限公司董事。"
    ],
    "Joyce Wong Ai May": [
      "Wong Ai May（Joyce）女士于 2020 年 11 月 2 日获委任为 PCCS 集团有限公司董事。她担任审计委员会及提名委员会主席，并为薪酬委员会成员。",
      "她拥有澳大利亚塔斯马尼亚大学会计与金融商业学士学位，是马来西亚会计师协会会员、马来西亚内部审计师协会企业会员及澳洲注册会计师公会资深会员。",
      "她于 1999 年加入 Smith Zain Securities Sdn. Bhd. 担任会计主管，并于 2002 年成为 BBMB Securities Sdn. Bhd. 槟城分行财务主管。她于 2004 年加入 Hwang-DBS Securities Berhad，随后投身专业服务领域，并创立 JWC Consulting Sdn. Bhd.，目前担任该公司董事总经理。",
      "她也是槟城 DISTED College 商学院行业顾问委员会成员及 Caritas Malaysia 独立董事。目前，她担任 Edelteq Holdings Berhad、3REN Berhad 及 FoundPac Group Berhad 的独立非执行董事。"
    ],
    "Tang Lai Huat": [
      "Dr. Tang Lai Huat 于 2016 年 9 月 1 日获委任为 PCCS 集团有限公司财务总监，并于 2018 年 3 月 1 日出任企业财务总监。他负责领导企业办公室以及集团财务与会计职能，包括信贷、医疗设备及新业务的政策执行与战略部署。",
      "他拥有工商管理博士学位、清华大学公共管理硕士及行政人员工商管理硕士学位、香港城市大学另一个行政人员工商管理硕士学位、工商管理硕士学位、ACCA 资格，以及由哈佛商学院与北京大学颁发的跨境扩张财务策略行政证书。",
      "Tang 博士的职业生涯始于审计及管理咨询，之后在制造业及林国荣创意科技大学担任高级财务与运营职务，并于 2012 年加入 PCCS。他也是马来西亚崇德经典教育协会副主席，并担任包括 Faire Berhad 在内的私人公司董事。",
      "截至 2026 年 3 月 31 日的财政年度，他与 PCCS 任何董事或主要股东不存在亲属关系、利益冲突，也没有任何相关定罪、制裁或处罚记录。"
    ]
  };

  window.PCCS_LEADER_BIOS_ZH = bios;
  document.querySelectorAll('.leader-card[data-leader-name]').forEach(function (card) {
    var name = card.getAttribute('data-leader-name');
    if (bios[name]) card.dataset.leaderBio = bios[name].join(' ');
  });
}());
