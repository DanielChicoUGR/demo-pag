const logo_ugr_negativo1536x428 = new Proxy({"src":"/demo_page/_astro/logo_ugr_negativo-1536x428.CawbxTco.png","width":1536,"height":428,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_ugr_negativo-1536x428.png";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/logo_ugr_negativo-1536x428.png");
							return target[name];
						}
					});

export { logo_ugr_negativo1536x428 as default };
