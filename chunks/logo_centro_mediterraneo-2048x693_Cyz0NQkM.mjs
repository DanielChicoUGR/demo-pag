const logo_centro_mediterraneo2048x693 = new Proxy({"src":"/demo_page/_astro/logo_centro_mediterraneo-2048x693.D9IQgf-H.png","width":2048,"height":693,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_centro_mediterraneo-2048x693.png";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_centro_mediterraneo-2048x693.png");
							return target[name];
						}
					});

export { logo_centro_mediterraneo2048x693 as default };
