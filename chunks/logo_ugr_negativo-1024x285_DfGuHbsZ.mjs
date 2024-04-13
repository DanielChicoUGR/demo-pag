const logo_ugr_negativo1024x285 = new Proxy({"src":"/demo_page/_astro/logo_ugr_negativo-1024x285.B3gme-YA.png","width":1024,"height":285,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_ugr_negativo-1024x285.png";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_ugr_negativo-1024x285.png");
							return target[name];
						}
					});

export { logo_ugr_negativo1024x285 as default };
