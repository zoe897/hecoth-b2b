/**
 * products-data.js
 * ------------------------------------------------------------
 * 产品数据集中管理文件（纯前端静态站，无需后端/数据库）
 *
 * ✅ 你只需要编辑本文件即可更新/新增产品
 * ✅ 图片统一放在：/images/xxx.jpg
 *
 * 产品字段说明（每个产品必须包含）：
 * - id:        string  产品唯一ID（建议用SKU/型号，如 "TR-120"；用于详情页参数 sku）
 * - name:      string  产品英文名称（用于列表/详情标题与SEO标题）
 * - category:  string  产品分类ID（用于分类筛选；必须匹配下方 Categories 中的某一个 id）
 * - image:     string  产品主图路径（必须使用 /images/文件名.jpg 形式）
 * - specs:     object  英文技术参数（用于详情页表格展示；键=参数名，值=参数值）
 * - desc:      string  英文简介（用于列表摘要/详情页描述/JSON-LD）
 * - features:  string[] 产品卖点/特点（用于详情页“Why buyers choose this model”展示）
 *
 * ⚠️ 提示
 * 1) 如需更强SEO（每个产品独立静态URL），可以后续生成静态产品页，但本版本保持纯静态+JS渲染。
 * 2) 你可以按市场需求继续补充 specs 与 features。
 */

(function () {
  // 分类元数据（用于首页分类卡片、产品分类筛选按钮）
  // 注意：这里不是“产品字段”，只是辅助展示分类名称/描述。
  const Categories = [
    {
      id: "tractors",
      name: "Agricultural Tractors & Implements",
      hero: "assets/img/cat-tractor.png",
      description:
        "Reliable tractors and implements engineered for tough conditions across Africa, Southeast Asia, Central Asia and South America.",
    },
    {
      id: "farm-machinery",
      name: "Farm Machinery",
      hero: "assets/img/cat-farm.jpg",
      description:
        "Planters, tillage equipment and harvest support machinery designed to improve productivity and reduce downtime.",
    },
    {
      id: "construction-machinery",
      name: "Construction Machinery",
      hero: "assets/img/cat-construction.jpg",
      description:
        "Excavators, loaders and road equipment for contractors, project owners and equipment rental companies.",
    },
    {
      id: "irrigation-parts",
      name: "Smart Drip Irrigation & Spare Parts",
      hero: "assets/img/cat-irrigation.jpg",
      description:
        "Water-saving drip irrigation systems, fertigation units, filters and machinery spare parts with stable export supply.",
    },
  ];

  /** @type {Array<{
   *  id:string,
   *  name:string,
   *  category:string,
   *  image:string,
   *  specs:Record<string,string>,
   *  desc:string,
   *  features:string[]
   * }>} */
  const Products = [
    {
      id: "TR-120",
      name: "120HP 4WD Agricultural Tractor",
      category: "tractors",
      image: "/images/tractor-120hp.jpg",
      desc:
        "Heavy-duty 4WD tractor for ploughing, planting and transport. Optimized for high temperature and dusty environments.",
      features: [
        "High torque diesel engine, low fuel consumption",
        "Strong 4WD drivetrain for soft soil and slopes",
        "Easy maintenance layout for remote service",
      ],
      specs: {
        Power: "120 HP",
        Drive: "4WD",
        PTO: "540/1000 rpm",
        Hydraulics: "≥ 25 L/min",
        Transmission: "12F+12R / Shuttle (optional)",
        "3-Point Hitch": "Category II",
        Tires: "Front 12.4-24 / Rear 16.9-34 (options)",
      },
    },
    {
      id: "FM-MP4R",
      name: "4-Row Maize Planter",
      category: "farm-machinery",
      image: "/images/maize-planter-4row.jpg",
      desc:
        "Efficient precision planting for maize. Adjustable row spacing for different agronomy requirements.",
      features: [
        "Stable seed metering",
        "Adjustable spacing for different regions",
        "Easy transport and setup",
      ],
      specs: {
        Rows: "4",
        "Row Spacing": "450–700 mm",
        Fertilizer: "Optional",
        "Recommended Tractor": "50–90 HP",
        "Working Speed": "5–8 km/h",
        "Drive Type": "Ground wheel drive",
      },
    },
    {
      id: "CM-EX20",
      name: "20 Ton Hydraulic Excavator",
      category: "construction-machinery",
      image: "/images/excavator-20t.jpg",
      desc:
        "Reliable 20T excavator for mining, earthmoving and municipal projects. Export configuration available.",
      features: [
        "Proven hydraulic system with stable performance",
        "Reinforced boom and arm for durability",
        "Fast access to filters for quick service",
      ],
      specs: {
        "Operating Weight": "20,000 kg",
        Bucket: "0.8–1.0 m³",
        Engine: "110–125 kW (configurable)",
        Tracks: "Steel tracks",
        "Max Digging Depth": "≥ 6,500 mm",
      },
    },
    {
      id: "IR-KIT1000",
      name: "Smart Drip Irrigation Kit (1000m)",
      category: "irrigation-parts",
      image: "/images/drip-kit-1000m.jpg",
      desc:
        "Water-saving drip irrigation system kit for farms and projects. Modular design for fast installation and expansion.",
      features: [
        "Designed for water-saving agriculture",
        "Compatible with fertigation and filtration",
        "Suitable for field crops and horticulture",
      ],
      specs: {
        Length: "1000 m",
        "Emitter Spacing": "20/30/40 cm options",
        "Pipe Diameter": "16/20 mm options",
        Control: "Manual / smart valve optional",
        Filtration: "Disc/screen filter recommended",
      },
    },
  ];

  // 对外暴露（供页面渲染使用）
  window.ProductsData = {
    categories: Categories,
    products: Products,
  };

  /**
   * ✅ 添加新产品（位置指引）
   * 1) 在上面的 Products 数组末尾复制一段产品对象
   * 2) 填写 id/name/category/image/desc/features/specs
   * 3) 把图片文件放到 /images/ 目录，并确保 image 字段为 /images/xxx.jpg
   * 4) 保存后刷新网站即可生效
   */
})();

