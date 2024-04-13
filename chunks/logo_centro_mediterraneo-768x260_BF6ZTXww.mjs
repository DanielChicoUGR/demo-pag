const logo_centro_mediterraneo768x260 = new Proxy({"src":"/demo_page/_astro/logo_centro_mediterraneo-768x260.CEvhzkg3.png","width":768,"height":260,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_centro_mediterraneo-768x260.png";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_centro_mediterraneo-768x260.png");
							return target[name];
						}
					});

export { logo_centro_mediterraneo768x260 as default };
