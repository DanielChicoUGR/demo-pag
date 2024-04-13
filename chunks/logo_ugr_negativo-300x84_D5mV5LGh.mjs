const logo_ugr_negativo300x84 = new Proxy({"src":"/demo_page/_astro/logo_ugr_negativo-300x84.Dw6H_6bW.png","width":300,"height":84,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_ugr_negativo-300x84.png";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_ugr_negativo-300x84.png");
							return target[name];
						}
					});

export { logo_ugr_negativo300x84 as default };
