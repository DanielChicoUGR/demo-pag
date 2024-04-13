const atomsMoleculeChemistry = new Proxy({"src":"/demo_page/_astro/atoms-molecule-chemistry.63q8zR0F.jpg","width":1280,"height":720,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/atoms-molecule-chemistry.jpg";
							}
							if (target[name] !== undefined) globalThis.astroAsset.referencedImages.add("/home/daniel/Proyectos/practicas/demo-pag/src/assets/images/atoms-molecule-chemistry.jpg");
							return target[name];
						}
					});

export { atomsMoleculeChemistry as default };
