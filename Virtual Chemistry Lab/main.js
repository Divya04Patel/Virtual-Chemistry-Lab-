
    lottie.loadAnimation({
      container: document.getElementById('lottieChemAnim'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assests/Animation - 1751621659082.json' // Change to your animation file path if different
    });

    // pH Simulation Logic
    const phSlider = document.getElementById("phSlider");
    const phValue = document.getElementById("phValue");
    const phBox = document.getElementById("phBox");

    phSlider.addEventListener("input", () => {
      const val = parseInt(phSlider.value);
      let nature = "", color = "";

      if (val < 7) {
        nature = "Acidic";
        color = `rgb(${255 - val * 20}, 100, 100)`;
      } else if (val === 7) {
        nature = "Neutral";
        color = "#00bcd4";
      } else {
        nature = "Basic";
       color = `rgb(${255 - val * 20}, 100, 100)`;
      }

  phValue.textContent = `pH: ${val} (${nature})`;
      phBox.style.backgroundColor = color;
    });
    // --- Periodic Table Data (all 118 elements, grouped) ---
    lottie.loadAnimation({
  container: document.getElementById('phFlaskAnim'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'assests/flask animation.json' // <-- Replace with your flask JSON file path
});
const elements = [
  // Period 1
  {num:1, sym:"H", name:"Hydrogen", mass:"1.008", config:"1s1", col:1, row:1, group:"reactive-nonmetals", groupName:"Reactive Nonmetals"},
  {num:2, sym:"He", name:"Helium", mass:"4.0026", config:"1s2", col:18, row:1, group:"noble-gases", groupName:"Noble Gases"},
  // Period 2
  {num:3, sym:"Li", name:"Lithium", mass:"6.94", config:"[He] 2s1", col:1, row:2, group:"alkali-metals", groupName:"Alkali Metals"},
  {num:4, sym:"Be", name:"Beryllium", mass:"9.0122", config:"[He] 2s2", col:2, row:2, group:"alkaline-earth-metals", groupName:"Alkaline Earth Metals"},
  {num:5, sym:"B", name:"Boron", mass:"10.81", config:"[He] 2s2 2p1", col:13, row:2, group:"boron-group", groupName:"Boron Group"},
  {num:6, sym:"C", name:"Carbon", mass:"12.011", config:"[He] 2s2 2p2", col:14, row:2, group:"carbon-group", groupName:"Carbon Group"},
  {num:7, sym:"N", name:"Nitrogen", mass:"14.007", config:"[He] 2s2 2p3", col:15, row:2, group:"nitrogen-group", groupName:"Nitrogen Group"},
  {num:8, sym:"O", name:"Oxygen", mass:"15.999", config:"[He] 2s2 2p4", col:16, row:2, group:"chalcogens", groupName:"Chalcogens"},
  {num:9, sym:"F", name:"Fluorine", mass:"18.998", config:"[He] 2s2 2p5", col:17, row:2, group:"halogens", groupName:"Halogens"},
  {num:10, sym:"Ne", name:"Neon", mass:"20.180", config:"[He] 2s2 2p6", col:18, row:2, group:"noble-gases", groupName:"Noble Gases"},
  // Period 3
  {num:11, sym:"Na", name:"Sodium", mass:"22.990", config:"[Ne] 3s1", col:1, row:3, group:"alkali-metals", groupName:"Alkali Metals"},
  {num:12, sym:"Mg", name:"Magnesium", mass:"24.305", config:"[Ne] 3s2", col:2, row:3, group:"alkaline-earth-metals", groupName:"Alkaline Earth Metals"},
  {num:13, sym:"Al", name:"Aluminum", mass:"26.982", config:"[Ne] 3s2 3p1", col:13, row:3, group:"boron-group", groupName:"Boron Group"},
  {num:14, sym:"Si", name:"Silicon", mass:"28.085", config:"[Ne] 3s2 3p2", col:14, row:3, group:"carbon-group", groupName:"Carbon Group"},
  {num:15, sym:"P", name:"Phosphorus", mass:"30.974", config:"[Ne] 3s2 3p3", col:15, row:3, group:"nitrogen-group", groupName:"Nitrogen Group"},
  {num:16, sym:"S", name:"Sulfur", mass:"32.06", config:"[Ne] 3s2 3p4", col:16, row:3, group:"chalcogens", groupName:"Chalcogens"},
  {num:17, sym:"Cl", name:"Chlorine", mass:"35.45", config:"[Ne] 3s2 3p5", col:17, row:3, group:"halogens", groupName:"Halogens"},
  {num:18, sym:"Ar", name:"Argon", mass:"39.948", config:"[Ne] 3s2 3p6", col:18, row:3, group:"noble-gases", groupName:"Noble Gases"},
  // Period 4
  {num:19, sym:"K", name:"Potassium", mass:"39.098", config:"[Ar] 4s1", col:1, row:4, group:"alkali-metals", groupName:"Alkali Metals"},
  {num:20, sym:"Ca", name:"Calcium", mass:"40.078", config:"[Ar] 4s2", col:2, row:4, group:"alkaline-earth-metals", groupName:"Alkaline Earth Metals"},
  {num:21, sym:"Sc", name:"Scandium", mass:"44.956", config:"[Ar] 3d1 4s2", col:3, row:4, group:"transition-metals", groupName:"Transition Metals"},
  {num:22, sym:"Ti", name:"Titanium", mass:"47.867", config:"[Ar] 3d2 4s2", col:4, row:4, group:"transition-metals", groupName:"Transition Metals"},
  {num:23, sym:"V", name:"Vanadium", mass:"50.942", config:"[Ar] 3d3 4s2", col:5, row:4, group:"transition-metals", groupName:"Transition Metals"},
  {num:24, sym:"Cr", name:"Chromium", mass:"51.996", config:"[Ar] 3d5 4s1", col:6, row:4, group:"transition-metals", groupName:"Transition Metals"},
  {num:25, sym:"Mn", name:"Manganese", mass:"54.938", config:"[Ar] 3d5 4s2", col:7, row:4, group:"transition-metals", groupName:"Transition Metals"},
  {num:26, sym:"Fe", name:"Iron", mass:"55.845", config:"[Ar] 3d6 4s2", col:8, row:4, group:"transition-metals", groupName:"Transition Metals"},
  {num:27, sym:"Co", name:"Cobalt", mass:"58.933", config:"[Ar] 3d7 4s2", col:9, row:4, group:"transition-metals", groupName:"Transition Metals"},
   {num:28, sym:"Ni", name:"Nickel", mass:"58.693", config:"[Ar] 3d8 4s2", col:10, row:4, group:"transition-metals", groupName:"Transition Metals"},
  {num:29, sym:"Cu", name:"Copper", mass:"63.546", config:"[Ar] 3d10 4s1", col:11, row:4, group:"transition-metals", groupName:"Transition Metals"},
  {num:30, sym:"Zn", name:"Zinc", mass:"65.38", config:"[Ar] 3d10 4s2", col:12, row:4, group:"transition-metals", groupName:"Transition Metals"},
  {num:31, sym:"Ga", name:"Gallium", mass:"69.723", config:"[Ar] 3d10 4s2 4p1", col:13, row:4, group:"boron-group", groupName:"Boron Group"},
  {num:32, sym:"Ge", name:"Germanium", mass:"72.630", config:"[Ar] 3d10 4s2 4p2", col:14, row:4, group:"carbon-group", groupName:"Carbon Group"},
  {num:33, sym:"As", name:"Arsenic", mass:"74.922", config:"[Ar] 3d10 4s2 4p3", col:15, row:4, group:"nitrogen-group", groupName:"Nitrogen Group"},
  {num:34, sym:"Se", name:"Selenium", mass:"78.971", config:"[Ar] 3d10 4s2 4p4", col:16, row:4, group:"chalcogens", groupName:"Chalcogens"},
  {num:35, sym:"Br", name:"Bromine", mass:"79.904", config:"[Ar] 3d10 4s2 4p5", col:17, row:4, group:"halogens", groupName:"Halogens"},
  {num:36, sym:"Kr", name:"Krypton", mass:"83.798", config:"[Ar] 3d10 4s2 4p6", col:18, row:4, group:"noble-gases", groupName:"Noble Gases"},
  // Period 5
  {num:37, sym:"Rb", name:"Rubidium", mass:"85.468", config:"[Kr] 5s1", col:1, row:5, group:"alkali-metals", groupName:"Alkali Metals"},
  {num:38, sym:"Sr", name:"Strontium", mass:"87.62", config:"[Kr] 5s2", col:2, row:5, group:"alkaline-earth-metals", groupName:"Alkaline Earth Metals"},
  {num:39, sym:"Y", name:"Yttrium", mass:"88.906", config:"[Kr] 4d1 5s2", col:3, row:5, group:"transition-metals", groupName:"Transition Metals"},
  {num:40, sym:"Zr", name:"Zirconium", mass:"91.224", config:"[Kr] 4d2 5s2", col:4, row:5, group:"transition-metals", groupName:"Transition Metals"},
  {num:41, sym:"Nb", name:"Niobium", mass:"92.906", config:"[Kr] 4d4 5s1", col:5, row:5, group:"transition-metals", groupName:"Transition Metals"},
  {num:42, sym:"Mo", name:"Molybdenum", mass:"95.95", config:"[Kr] 4d5 5s1", col:6, row:5, group:"transition-metals", groupName:"Transition Metals"},
  {num:43, sym:"Tc", name:"Technetium", mass:"98", config:"[Kr] 4d5 5s2", col:7, row:5, group:"transition-metals", groupName:"Transition Metals"},
  {num:44, sym:"Ru", name:"Ruthenium", mass:"101.07", config:"[Kr] 4d7 5s1", col:8, row:5, group:"transition-metals", groupName:"Transition Metals"},
  {num:45, sym:"Rh", name:"Rhodium", mass:"102.91", config:"[Kr] 4d8 5s1", col:9, row:5, group:"transition-metals", groupName:"Transition Metals"},
  {num:46, sym:"Pd", name:"Palladium", mass:"106.42", config:"[Kr] 4d10", col:10, row:5, group:"transition-metals", groupName:"Transition Metals"},
  {num:47, sym:"Ag", name:"Silver", mass:"107.87", config:"[Kr] 4d10 5s1", col:11, row:5, group:"transition-metals", groupName:"Transition Metals"},
  {num:48, sym:"Cd", name:"Cadmium", mass:"112.41", config:"[Kr] 4d10 5s2", col:12, row:5, group:"transition-metals", groupName:"Transition Metals"},
   {num:49, sym:"In", name:"Indium", mass:"114.82", config:"[Kr] 4d10 5s2 5p1", col:13, row:5, group:"boron-group", groupName:"Boron Group"},
  {num:50, sym:"Sn", name:"Tin", mass:"118.71", config:"[Kr] 4d10 5s2 5p2", col:14, row:5, group:"carbon-group", groupName:"Carbon Group"},
  {num:51, sym:"Sb", name:"Antimony", mass:"121.76", config:"[Kr] 4d10 5s2 5p3", col:15, row:5, group:"nitrogen-group", groupName:"Nitrogen Group"},
  {num:52, sym:"Te", name:"Tellurium", mass:"127.60", config:"[Kr] 4d10 5s2 5p4", col:16, row:5, group:"chalcogens", groupName:"Chalcogens"},
  {num:53, sym:"I", name:"Iodine", mass:"126.90", config:"[Kr] 4d10 5s2 5p5", col:17, row:5, group:"halogens", groupName:"Halogens"},
  {num:54, sym:"Xe", name:"Xenon", mass:"131.29", config:"[Kr] 4d10 5s2 5p6", col:18, row:5, group:"noble-gases", groupName:"Noble Gases"},
  // Period 6
  {num:55, sym:"Cs", name:"Cesium", mass:"132.91", config:"[Xe] 6s1", col:1, row:6, group:"alkali-metals", groupName:"Alkali Metals"},
  {num:56, sym:"Ba", name:"Barium", mass:"137.33", config:"[Xe] 6s2", col:2, row:6, group:"alkaline-earth-metals", groupName:"Alkaline Earth Metals"},
  {num:57, sym:"La", name:"Lanthanum", mass:"138.91", config:"[Xe] 5d1 6s2", col:3, row:6, group:"lanthanides", groupName:"Lanthanides"},
  {num:58, sym:"Ce", name:"Cerium", mass:"140.12", config:"[Xe] 4f1 5d1 6s2", col:4, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:59, sym:"Pr", name:"Praseodymium", mass:"140.91", config:"[Xe] 4f3 6s2", col:5, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:60, sym:"Nd", name:"Neodymium", mass:"144.24", config:"[Xe] 4f4 6s2", col:6, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:61, sym:"Pm", name:"Promethium", mass:"145", config:"[Xe] 4f5 6s2", col:7, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:62, sym:"Sm", name:"Samarium", mass:"150.36", config:"[Xe] 4f6 6s2", col:8, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:63, sym:"Eu", name:"Europium", mass:"151.96", config:"[Xe] 4f7 6s2", col:9, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:64, sym:"Gd", name:"Gadolinium", mass:"157.25", config:"[Xe] 4f7 5d1 6s2", col:10, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:65, sym:"Tb", name:"Terbium", mass:"158.93", config:"[Xe] 4f9 6s2", col:11, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:66, sym:"Dy", name:"Dysprosium", mass:"162.50", config:"[Xe] 4f10 6s2", col:12, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:67, sym:"Ho", name:"Holmium", mass:"164.93", config:"[Xe] 4f11 6s2", col:13, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:68, sym:"Er", name:"Erbium", mass:"167.26", config:"[Xe] 4f12 6s2", col:14, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:69, sym:"Tm", name:"Thulium", mass:"168.93", config:"[Xe] 4f13 6s2", col:15, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:70, sym:"Yb", name:"Ytterbium", mass:"173.05", config:"[Xe] 4f14 6s2", col:16, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:71, sym:"Lu", name:"Lutetium", mass:"174.97", config:"[Xe] 4f14 5d1 6s2", col:17, row:9, group:"lanthanides", groupName:"Lanthanides"},
  {num:72, sym:"Hf", name:"Hafnium", mass:"178.49", config:"[Xe] 4f14 5d2 6s2", col:4, row:6, group:"transition-metals", groupName:"Transition Metals"},
  {num:73, sym:"Ta", name:"Tantalum", mass:"180.95", config:"[Xe] 4f14 5d3 6s2", col:5, row:6, group:"transition-metals", groupName:"Transition Metals"},
  {num:74, sym:"W", name:"Tungsten", mass:"183.84", config:"[Xe] 4f14 5d4 6s2", col:6, row:6, group:"transition-metals", groupName:"Transition Metals"},
  {num:75, sym:"Re", name:"Rhenium", mass:"186.21", config:"[Xe] 4f14 5d5 6s2", col:7, row:6, group:"transition-metals", groupName:"Transition Metals"},
  {num:76, sym:"Os", name:"Osmium", mass:"190.23", config:"[Xe] 4f14 5d6 6s2", col:8, row:6, group:"transition-metals", groupName:"Transition Metals"},
  {num:77, sym:"Ir", name:"Iridium", mass:"192.22", config:"[Xe] 4f14 5d7 6s2", col:9, row:6, group:"transition-metals", groupName:"Transition Metals"},
  {num:78, sym:"Pt", name:"Platinum", mass:"195.08", config:"[Xe] 4f14 5d9 6s1", col:10, row:6, group:"transition-metals", groupName:"Transition Metals"},
  {num:79, sym:"Au", name:"Gold", mass:"196.97", config:"[Xe] 4f14 5d10 6s1", col:11, row:6, group:"transition-metals", groupName:"Transition Metals"},
  {num:80, sym:"Hg", name:"Mercury", mass:"200.59", config:"[Xe] 4f14 5d10 6s2", col:12, row:6, group:"transition-metals", groupName:"Transition Metals"},
  {num:81, sym:"Tl", name:"Thallium", mass:"204.38", config:"[Xe] 4f14 5d10 6s2 6p1", col:13, row:6, group:"boron-group", groupName:"Boron Group"},
  {num:82, sym:"Pb", name:"Lead", mass:"207.2", config:"[Xe] 4f14 5d10 6s2 6p2", col:14, row:6, group:"carbon-group", groupName:"Carbon Group"},
  {num:83, sym:"Bi", name:"Bismuth", mass:"208.98", config:"[Xe] 4f14 5d10 6s2 6p3", col:15, row:6, group:"nitrogen-group", groupName:"Nitrogen Group"},
  {num:84, sym:"Po", name:"Polonium", mass:"209", config:"[Xe] 4f14 5d10 6s2 6p4", col:16, row:6, group:"chalcogens", groupName:"Chalcogens"},
  {num:85, sym:"At", name:"Astatine", mass:"210", config:"[Xe] 4f14 5d10 6s2 6p5", col:17, row:6, group:"halogens", groupName:"Halogens"},
  {num:86, sym:"Rn", name:"Radon", mass:"222", config:"[Xe] 4f14 5d10 6s2 6p6", col:18, row:6, group:"noble-gases", groupName:"Noble Gases"},
  // Period 7
  {num:87, sym:"Fr", name:"Francium", mass:"223", config:"[Rn] 7s1", col:1, row:7, group:"alkali-metals", groupName:"Alkali Metals"},
  {num:88, sym:"Ra", name:"Radium", mass:"226", config:"[Rn] 7s2", col:2, row:7, group:"alkaline-earth-metals", groupName:"Alkaline Earth Metals"},
  {num:89, sym:"Ac", name:"Actinium", mass:"227", config:"[Rn] 6d1 7s2", col:3, row:10, group:"actinides", groupName:"Actinides"},
  {num:90, sym:"Th", name:"Thorium", mass:"232.04", config:"[Rn] 6d2 7s2", col:4, row:10, group:"actinides", groupName:"Actinides"},
  {num:91, sym:"Pa", name:"Protactinium", mass:"231.04", config:"[Rn] 5f2 6d1 7s2", col:5, row:10, group:"actinides", groupName:"Actinides"},
  {num:92, sym:"U", name:"Uranium", mass:"238.03", config:"[Rn] 5f3 6d1 7s2", col:6, row:10, group:"actinides", groupName:"Actinides"},
  {num:93, sym:"Np", name:"Neptunium", mass:"237", config:"[Rn] 5f4 6d1 7s2", col:7, row:10, group:"actinides", groupName:"Actinides"},
  {num:94, sym:"Pu", name:"Plutonium", mass:"244", config:"[Rn] 5f6 7s2", col:8, row:10, group:"actinides", groupName:"Actinides"},
  {num:95, sym:"Am", name:"Americium", mass:"243", config:"[Rn] 5f7 7s2", col:9, row:10, group:"actinides", groupName:"Actinides"},
  {num:96, sym:"Cm", name:"Curium", mass:"247", config:"[Rn] 5f7 6d1 7s2", col:10, row:10, group:"actinides", groupName:"Actinides"},
  {num:97, sym:"Bk", name:"Berkelium", mass:"247", config:"[Rn] 5f9 7s2", col:11, row:10, group:"actinides", groupName:"Actinides"},
  {num:98, sym:"Cf", name:"Californium", mass:"251", config:"[Rn] 5f10 7s2", col:12, row:10, group:"actinides", groupName:"Actinides"},
  {num:99, sym:"Es", name:"Einsteinium", mass:"252", config:"[Rn] 5f11 7s2", col:13, row:10, group:"actinides", groupName:"Actinides"},
  {num:100, sym:"Fm", name:"Fermium", mass:"257", config:"[Rn] 5f12 7s2", col:14, row:10, group:"actinides", groupName:"Actinides"},
  {num:101, sym:"Md", name:"Mendelevium", mass:"258", config:"[Rn] 5f13 7s2", col:15, row:10, group:"actinides", groupName:"Actinides"},
  {num:102, sym:"No", name:"Nobelium", mass:"259", config:"[Rn] 5f14 7s2", col:16, row:10, group:"actinides", groupName:"Actinides"},
  {num:103, sym:"Lr", name:"Lawrencium", mass:"266", config:"[Rn] 5f14 7s2 7p1", col:17, row:10, group:"actinides", groupName:"Actinides"},
  {num:104, sym:"Rf", name:"Rutherfordium", mass:"267", config:"[Rn] 5f14 6d2 7s2", col:4, row:7, group:"transition-metals", groupName:"Transition Metals"},
  {num:105, sym:"Db", name:"Dubnium", mass:"270", config:"[Rn] 5f14 6d3 7s2", col:5, row:7, group:"transition-metals", groupName:"Transition Metals"},
  {num:106, sym:"Sg", name:"Seaborgium", mass:"271", config:"[Rn] 5f14 6d4 7s2", col:6, row:7, group:"transition-metals", groupName:"Transition Metals"},
  {num:107, sym:"Bh", name:"Bohrium", mass:"270", config:"[Rn] 5f14 6d5 7s2", col:7, row:7, group:"transition-metals", groupName:"Transition Metals"},
  {num:108, sym:"Hs", name:"Hassium", mass:"277", config:"[Rn] 5f14 6d6 7s2", col:8, row:7, group:"transition-metals", groupName:"Transition Metals"},
  {num:109, sym:"Mt", name:"Meitnerium", mass:"278", config:"[Rn] 5f14 6d7 7s2", col:9, row:7, group:"transition-metals", groupName:"Transition Metals"},
  {num:110, sym:"Ds", name:"Darmstadtium", mass:"281", config:"[Rn] 5f14 6d8 7s2", col:10, row:7, group:"transition-metals", groupName:"Transition Metals"},
  {num:111, sym:"Rg", name:"Roentgenium", mass:"282", config:"[Rn] 5f14 6d9 7s2", col:11, row:7, group:"transition-metals", groupName:"Transition Metals"},
  {num:112, sym:"Cn", name:"Copernicium", mass:"285", config:"[Rn] 5f14 6d10 7s2", col:12, row:7, group:"transition-metals", groupName:"Transition Metals"},
    {num:113, sym:"Nh", name:"Nihonium", mass:"286", config:"[Rn] 5f14 6d10 7s2 7p1", col:13, row:7, group:"boron-group", groupName:"Boron Group"},
  {num:114, sym:"Fl", name:"Flerovium", mass:"289", config:"[Rn] 5f14 6d10 7s2 7p2", col:14, row:7, group:"carbon-group", groupName:"Carbon Group"},
  {num:115, sym:"Mc", name:"Moscovium", mass:"290", config:"[Rn] 5f14 6d10 7s2 7p3", col:15, row:7, group:"nitrogen-group", groupName:"Nitrogen Group"},
  {num:116, sym:"Lv", name:"Livermorium", mass:"293", config:"[Rn] 5f14 6d10 7s2 7p4", col:16, row:7, group:"chalcogens", groupName:"Chalcogens"},
  {num:117, sym:"Ts", name:"Tennessine", mass:"294", config:"[Rn] 5f14 6d10 7s2 7p5", col:17, row:7, group:"halogens", groupName:"Halogens"},
  {num:118, sym:"Og", name:"Oganesson", mass:"294", config:"[Rn] 5f14 6d10 7s2 7p6", col:18, row:7, group:"noble-gases", groupName:"Noble Gases"}
];

    // --- Render Periodic Table ---
    const ptable = document.getElementById('ptable');
    for(let row=1; row<=7; row++) {
      for(let col=1; col<=18; col++) {
        const el = elements.find(e => e.row===row && e.col===col);
        const div = document.createElement('div');
        if(el) {
          div.className = 'element ' + el.group;
          div.innerHTML = `<span class="atomic-number">${el.num}</span><div class="symbol">${el.sym}</div>`;
          div.title = el.name;
          div.onclick = () => showModal(el);
        } else {
          div.style.background = 'transparent';
          div.style.border = 'none';
          div.style.cursor = 'default';
        }
        ptable.appendChild(div);
      }
    }
    // Lanthanides (row 9)
    for(let col=3; col<=17; col++) {
      const el = elements.find(e => e.row===9 && e.col===col);
      const div = document.createElement('div');
      if(el) {
        div.className = 'element lanthanides';
        div.innerHTML = `<span class="atomic-number">${el.num}</span><div class="symbol">${el.sym}</div>`;
        div.title = el.name;
        div.onclick = () => showModal(el);
      } else {
        div.style.background = 'transparent';
        div.style.border = 'none';
        div.style.cursor = 'default';
      }
      ptable.appendChild(div);
    }
    // Actinides (row 10)
    for(let col=3; col<=17; col++) {
      const el = elements.find(e => e.row===10 && e.col===col);
      const div = document.createElement('div');
      if(el) {
        div.className = 'element actinides';
      div.innerHTML = `<span class="atomic-number">${el.num}</span><div class="symbol">${el.sym}</div>`;
        div.title = el.name;
        div.onclick = () => showModal(el);
      } else {
        div.style.background = 'transparent';
        div.style.border = 'none';
        div.style.cursor = 'default';
      }
      ptable.appendChild(div);
    }

    // --- Bubble/Splash Effect ---
function addSplashEffect(e) {
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const splash = document.createElement('span');
  splash.className = 'bubble-effect';
  splash.style.left = (e.clientX - rect.left) + 'px';
  splash.style.top = (e.clientY - rect.top) + 'px';
  splash.style.width = splash.style.height = Math.max(rect.width, rect.height) + 'px';
  target.style.position = 'relative';
  target.appendChild(splash);
  splash.addEventListener('animationend', () => splash.remove());
}
document.querySelectorAll('.element, nav a, .equipment-grid .item').forEach(el => {
  el.addEventListener('click', addSplashEffect);
});

    // --- Modal Logic ---
    function showModal(el) {
      document.getElementById('modalSymbol').textContent = el.sym;
      document.getElementById('modalName').textContent = el.name;
      document.getElementById('modalNumber').textContent = el.num;
      document.getElementById('modalMass').textContent = el.mass;
      document.getElementById('modalConfig').textContent = el.config;
      document.getElementById('modalGroup').textContent = el.groupName || '';
      document.getElementById('modalBg').style.display = 'flex';
    }
    function closeModal() {
      document.getElementById('modalBg').style.display = 'none';
    }
    document.getElementById('modalBg').onclick = function(e) {
      if(e.target === this) closeModal();
    }
    document.addEventListener('keydown', function(e) {
      if(e.key === "Escape") closeModal();
    });
   

window.addEventListener('DOMContentLoaded', function() {
  const studentEmail = localStorage.getItem('student_email');
  const teacherEmail = localStorage.getItem('teacher_email');
  const nav = document.querySelector('nav');
  const dropdown = nav.querySelector('.dropdown');
  const oldUserDiv = document.getElementById('user-info');
  if (oldUserDiv) oldUserDiv.remove();

  // If logged in, replace Login dropdown with user menu
  if ((studentEmail || teacherEmail) && nav && dropdown) {
    dropdown.style.display = 'none';

    const userDiv = document.createElement('div');
    userDiv.id = 'user-info';
    userDiv.style.display = 'flex';
    userDiv.style.alignItems = 'center';
    userDiv.style.gap = '8px';
    userDiv.style.position = 'absolute';
    userDiv.style.right = '10px';
    userDiv.style.top = '-10px';
    userDiv.style.background = 'rgba(255,255,255,0.15)';
    userDiv.style.padding = '6px 14px';
    userDiv.style.borderRadius = '18px';
    userDiv.style.fontWeight = '500';
    userDiv.style.zIndex = '1002';

    // User menu dropdown
   userDiv.innerHTML = `
  <div class="user-menu" style="position:relative;">
    <button id="userMenuBtn" style="background:none;border:none;display:flex;align-items:center;gap:8px;cursor:pointer;color:inherit;">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User" style="width:28px;height:28px;border-radius:50%;background:#fff;">
      <span>${teacherEmail ? teacherEmail : studentEmail}</span>
      <i class="fa fa-caret-down"></i>
    </button>
    <div id="userMenuDropdown" style="display:none;position:absolute;right:0;top:38px;background:#fff;min-width:180px;box-shadow:0 8px 16px rgba(0,0,0,0.12);border-radius:8px;z-index:1003;">
      <a href="${teacherEmail ? 'teacher_dashboard.html' : 'student_dashboard.html'}" style="display:block;padding:10px 18px;color:#0d47a1;text-decoration:none;">Dashboard</a>
      <div style="padding:10px 18px;color:#0d47a1;border-top:1px solid #eee;">${teacherEmail ? 'Teacher' : 'Student'}<br><small>${teacherEmail ? teacherEmail : studentEmail}</small></div>
      <button id="logout-btn" style="width:90%;margin:10px 5%;padding:6px 0;border:none;border-radius:8px;background:#e57373;color:#fff;cursor:pointer;">Logout</button>
    </div>
  </div>
`;
    nav.style.position = 'relative';
    nav.appendChild(userDiv);

    // Dropdown logic
    const userMenuBtn = userDiv.querySelector('#userMenuBtn');
    const userMenuDropdown = userDiv.querySelector('#userMenuDropdown');
    userMenuBtn.onclick = function(e) {
      e.stopPropagation();
      userMenuDropdown.style.display = userMenuDropdown.style.display === 'block' ? 'none' : 'block';
    };
    document.body.addEventListener('click', function() {
      userMenuDropdown.style.display = 'none';
    });

    // Logout logic
    setTimeout(() => {
      document.getElementById('logout-btn').onclick = function() {
        localStorage.removeItem('student_email');
        localStorage.removeItem('teacher_email');
        location.reload();
      };
    }, 0);
  }
});
