const logo_centro_mediterraneo1536x520 = new Proxy({"src":"/demo_page/_astro/logo_centro_mediterraneo-1536x520.CZHILVcR.png","width":1536,"height":520,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_centro_mediterraneo-1536x520.png";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_centro_mediterraneo-1536x520.png");
							return target[name];
						}
					});

export { logo_centro_mediterraneo1536x520 as default };
