const home_main = new Proxy({"src":"/demo_page/_astro/home_main.ol-XNk1X.jpg","width":768,"height":575,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/home_main.jpg";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/home_main.jpg");
							return target[name];
						}
					});

export { home_main as default };
