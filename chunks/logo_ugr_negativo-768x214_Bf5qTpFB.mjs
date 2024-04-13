const logo_ugr_negativo768x214 = new Proxy({"src":"/demo_page/_astro/logo_ugr_negativo-768x214.D6Ylx6A9.png","width":768,"height":214,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_ugr_negativo-768x214.png";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_ugr_negativo-768x214.png");
							return target[name];
						}
					});

export { logo_ugr_negativo768x214 as default };
