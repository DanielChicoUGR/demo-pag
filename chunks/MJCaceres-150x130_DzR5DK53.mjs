const MJCaceres150x130 = new Proxy({"src":"/demo_page/_astro/MJCaceres-150x130.BGsTXZGt.jpeg","width":150,"height":130,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/MJCaceres-150x130.jpeg";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/MJCaceres-150x130.jpeg");
							return target[name];
						}
					});

export { MJCaceres150x130 as default };
