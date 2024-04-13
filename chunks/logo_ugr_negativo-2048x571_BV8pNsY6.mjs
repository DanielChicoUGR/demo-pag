const logo_ugr_negativo2048x571 = new Proxy({"src":"/demo_page/_astro/logo_ugr_negativo-2048x571.BCYJBLwM.png","width":2048,"height":571,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_ugr_negativo-2048x571.png";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_ugr_negativo-2048x571.png");
							return target[name];
						}
					});

export { logo_ugr_negativo2048x571 as default };
