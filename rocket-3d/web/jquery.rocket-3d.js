;(function($) {
     $.fn.rocket3d = function(options) {
         var defaults = {
             enterOn: 'now',
             delayTime: 5000,
             width: $(window).width(),
             height: $(window).height(),
             far: 10000,
             near: 0.1,
             angle: 40,
             show_stats: false,
             stars: 800,
             konami_code: "38,38,40,40,37,39,37,39,66,65",
             show_wireframes: false,
             use_mouse: true,
             camera_z_position: 1500,
             light_color: 0xFFFFFF,
             orbit_light_color: 0xff8800,
             rocket_obj: 'obj/rocket3d.js',
             rocket_tex: 'tex/rocket3d_uvmap.png',
             rocket_rotation: {
                 x: Math.PI / 2,
                 y: Math.PI * 1.1,
                 z: Math.PI / 2
             },
             fire_obj: 'obj/rocket3d_flame.js',
             fire_color: 0xFFBB00,
             onInitCallback: false,
             //playSong: 'http://files.42k.fr/files/hehengT016-space.mp3'
             playSong: 'mus/space-loop-2.ogg'
         };
         var options = $.extend(defaults, options);

         return this.each(function() {
                              var _this = $(this);
                              var _started = false;

                              function init() {
                                  if (_started) {
                                      return ;
                                  }
                                  _started = true;
                                  if (typeof(Detector) == 'undefined' || !Detector.webgl) {
                                      Detector.addGetWebGLMessage();
                                      return ;
                                  }
                                  var camera, scene, container, renderer, mesh, light, light1, l1;
                                  var stats = false,
                                  mouseX = 0,
                                  mouseY = 0,
			          windowHalfX = options.width / 2,
			          windowHalfY = options.height / 2,
                                  aspect = options.width / options.height;

                                  $('body').append('<div id="rocket3dcontainer"></div>');
                                  container = $('#rocket3dcontainer');
                                  container.css({position: 'absolute', width: options.width, height: options.height, top: 0, left: 0});
                                  container.css({background: '#000000'});
                                  container.hide();
                                  container.fadeIn(3000);

				  camera = new THREE.PerspectiveCamera(options.angle, aspect, options.near, options.far);
				  camera.position.z = options.camera_z_position;
				  scene = new THREE.Scene();

                                  scene.fog = new THREE.FogExp2(0x888888, 0.0003);
                                  scene.fog.color.setRGB(0.5, 0.5, 0.5);

				  var light = new THREE.DirectionalLight(options.light_color);
				  light.position.set(0, 0, 1).normalize();
				  scene.add(light);

                                  //var ambientLight = new THREE.AmbientLight(0x0000FF);
                                  //scene.add(ambientLight);

				  var loader = new THREE.JSONLoader();

                                  var particleMaterial= new THREE.ParticleBasicMaterial({
                                                                                            color: 0xFF66FF,
                                                                                            size: 15,
                                                                                            blending: THREE.AdditiveBlending,
                                                                                            transparent: true
                                                                                        });
                                  var particleGeometry = new THREE.Geometry();
                                  for (var p = 0; p < options.stars; p++) {
                                      particleGeometry.vertices.push(
                                          new THREE.Vertex(
                                              new THREE.Vector3(
                                                  Math.random() * options.camera_z_position * 15 - options.camera_z_position * 3,
                                                  Math.random() * options.camera_z_position * 6 - options.camera_z_position * 3,
                                                  -1000
                                              )
                                          )
                                      );
                                  }
                                  var particleSystem = new THREE.ParticleSystem(particleGeometry, particleMaterial);
                                  scene.add(particleSystem);

				  loader.load(options.rocket_obj, function (geometry) {
				                  geometry.materials[0].shading = THREE.FlatShading;
                                                  mesh = new THREE.Object3D();
				                  mesh.position.x = -300;
                                                  mesh.rotation = {
                                                      x: options.rocket_rotation.x,
                                                      y: options.rocket_rotation.y,
                                                      z: options.rocket_rotation.z
                                                      };
				                  mesh.scale.x = mesh.scale.y = mesh.scale.z = 150;
				                  //scene.add(mesh);
				                  var part1 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture(options.rocket_tex)}));
				                  mesh.add(part1);
                                                  if (options.show_wireframes) {
                                                      var part2 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xff0000, opacity: 0.9, shading: THREE.FlatShading, wireframe: true, wireframeLinewidth: 2, transparent: true }));
				                      mesh.add(part2);
                                                  }
                                                  container.parent().css('overflow', 'hidden');
                                                  $('html,body').css('overflow', 'hidden');
                                                  $("html:not(:animated),body:not(:animated)").animate({scrollTop: 0}, 500);
                                                  if (options.onInitCallback) {
                                                      options.onInitCallback();
                                                  }

                                                  //animate();
				                  loader.load(options.fire_obj, function (geometry) {
				                                  geometry.materials[0].shading = THREE.FlatShading;
                                                                  mesh2 = new THREE.Object3D();
                                                                  mesh2.position = mesh.position;
                                                                  mesh2.rotation = mesh.rotation;
				                                  mesh2.scale.x = mesh2.scale.y = mesh2.scale.z = 150;
				                                  //scene.add(mesh2);

                                                                  var part1 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: options.fire_color, opacity: 0.9, overdraw: false}));
				                                  mesh2.add(part1);
                                                                  if (options.show_wireframes) {
                                                                      var part2 = new THREE.Mesh(geometry, new THREE.Mesh({ color: 0xff0000, opacity: 0.9, shading: THREE.FlatShading, wireframe: true, wireframeLinewidth: 2, transparent: true }));
				                                      mesh2.add(part2);
                                                                  }

                                                                  pointLight = false;
                                                                  /*pointLight = new THREE.PointLight(options.fire_color);
                                                                  pointLight.position = mesh.position;
                                                                  pointLight.rotation = mesh.rotation;*/


                                                                  var dummy = new THREE.Object3D();


                                                                  light1 = new THREE.PointLight(options.orbit_light_color, 5, 300);
                                                                  scene.add(light1);
                                                                  light1.intensity = 5;
                                                                  var sphere = new THREE.SphereGeometry(5, 16, 8);
                                                                  l1 = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: options.orbit_light_color }));
                                                                  l1.position = light1.position;
                                                                  scene.add(l1);




                                                                  dummy.add(mesh);
                                                                  dummy.add(mesh2);
                                                                  //dummy.add(pointLight);
                                                                  scene.add(dummy);

                                                                  fireNewTween(mesh2, pointLight, 150);
                                                                  oscilNewTween(dummy);

                                                                  if (options.playSong) {
                                                                      $('body').append('<audio src="'+options.playSong+'" autoplay loop></audio>');
                                                                  }
                                                                  animate();
                                                              });
                                              });

                                  function fireNewTween(mesh, pointLight, oldSize) {
                                      var newSize = Math.random() * 100 + 100;
                                      //console.dir(pointLight.position);

                                      if (pointLight) {
                                          new TWEEN.Tween(pointLight)
                                              .to({intensity: newSize / 5}, 150)
                                              .easing(TWEEN.Easing.Cubic.EaseIn)
                                              .start();
                                      }

                                      new TWEEN.Tween(mesh.scale)
                                          .to({
                                                  x: newSize,
                                                  y: newSize,
                                                  z: newSize
                                              }, 150)
                                          .easing(TWEEN.Easing.Cubic.EaseIn)
                                          .onComplete(function() { fireNewTween(mesh, pointLight, newSize); })
                                          .start();
                                  }

                                  function oscilNewTween(mesh) {
                                      new TWEEN.Tween(mesh.rotation)
                                          .to({
                                                  x: Math.random() * Math.PI / 15,
                                                  y: Math.random() * Math.PI / 20,
                                                  z: Math.random() * Math.PI / 15
                                              }, 930)
                                          .easing(TWEEN.Easing.Linear.EaseNone)
                                          //.easing(TWEEN.Easing.Circular.EaseInOut)
                                          .onComplete(function() { oscilNewTween(mesh); })
                                          .start();
                                  }

				  renderer = new THREE.WebGLRenderer({antialias: true});
				  renderer.setSize(options.width, options.height);
                                  container.append(renderer.domElement);

                                  if (options.show_stats && typeof(Stats) != 'undefined') {
				      stats = new Stats();
				      stats.domElement.style.position = 'absolute';
				      stats.domElement.style.top = '0px';
				      stats.domElement.style.right = '0px';
				      container.append(stats.domElement);
                                  }

                                  if (options.use_mouse) {
				      document.addEventListener('mousemove', function(event) {
				                                    mouseX = (event.clientX - windowHalfX) * 2;
				                                    mouseY = (event.clientY - windowHalfY) * 2;
                                                                }, false);
                                  }


			          function animate() {
				      requestAnimationFrame(animate);

                                      if (l1) {
                                          var time = Date.now() * 0.0005;
                                          l1.position.x = Math.sin(time * 1) * 500;
                                          l1.position.y = Math.cos(time * 1) * 300;
                                          l1.position.z = Math.cos(time * 1) * 200;
                                      }

				      camera.position.x += (mouseX - camera.position.x ) * 1;
				      camera.position.y += (-mouseY - camera.position.y ) * 1;
				      camera.lookAt(scene.position);

                                      particleSystem.position.x -= 0.5;

                                      TWEEN.update();

				      renderer.render(scene, camera);

                                      if (options.show_stats && stats) {
				          stats.update();
                                      }
			          }
                              }

                              if (options.enterOn == 'now') {
                                  init();
                              } else if (options.enterOn == 'timer') {
                                  setTimeout(init, options.delayTime);
                              } else if(options.enterOn == 'click') {
                                  _this.bind('click', function(e) {
                                                 e.preventDefault();
                                                 init();
                                             });
                              } else if(options.enterOn == 'konami-code') {
                                  var kkeys = [], konami = options.konami_code;
                                  $(window).bind("keydown.rocketz", function(e) {
                                                     kkeys.push(e.keyCode);
                                                     if (kkeys.toString().indexOf(konami) >= 0) {
                                                         init();
                                                         kkeys = []
                                                     }
                                                 }, true);
                              }

                          });
     }
 })(jQuery);
