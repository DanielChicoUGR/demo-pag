const logo_centro_mediterraneo300x102 = new Proxy({"src":"/demo_page/_astro/logo_centro_mediterraneo-300x102.QqJDuLDR.png","width":300,"height":102,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_centro_mediterraneo-300x102.png";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_centro_mediterraneo-300x102.png");
							return target[name];
						}
					});

export { logo_centro_mediterraneo300x102 as default };
