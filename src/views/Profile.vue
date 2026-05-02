<template>
  <div class="app-container animate-fade-in">
    <header class="header-glass py-3 px-md-5">
      <div class="d-flex justify-content-between align-items-center">
        <button class="btn-back-modern ripple" @click="$router.push('/dashboard')">
          <div class="icon-circle">
            <i class="bi bi-arrow-left-short"></i>
          </div>
          <span>DASHBOARD</span>
        </button>
        
        <div class="header-center text-center">
          <div class="brand-logo-purple shadow-glow">AJ</div>
          <h2 class="admin-title-purple mt-2">SYSTEM ARCHITECT</h2>
        </div>

        <button class="btn-deploy-purple shadow-glow" @click="syncData">
          <i class="bi bi-lightning-charge-fill me-2"></i>DEPLOY
        </button>
      </div>
    </header>

    <main class="content-scroll-area p-3 p-md-5">
      <div class="container-fluid max-width-xl">
        <div class="row g-4">
          
          <aside class="col-xl-4 col-lg-5">
            <div class="glass-card-purple p-5 text-center position-relative h-100 overflow-hidden">
              <div class="profile-container-circle mb-4">
                <div class="pulse-ring-purple"></div>
                <img :src="adminData.profileImage" class="profile-img-circle shadow-premium">
                <label class="edit-btn-purple">
                  <i class="bi bi-camera-fill"></i>
                  <input type="file" @change="onFileChange" hidden>
                </label>
              </div>

              <input v-model="adminData.name" class="input-name-purple mb-1" placeholder="Admin Name">
              <div class="role-wrapper mb-4">
                <span class="role-dot"></span>
                <input v-model="adminData.role" class="input-role-purple" placeholder="Role">
              </div>

              <div class="field-group-purple mt-5 text-start">
                <label class="label-purple">SYSTEM MANIFESTO</label>
                <textarea v-model="adminData.bio" class="textarea-purple-glass" placeholder="Write vision..."></textarea>
              </div>
              
              <div class="field-group-purple mt-3 text-start">
                <label class="label-purple">SECURE ENDPOINT</label>
                <div class="input-wrapper-purple">
                  <i class="bi bi-shield-check-fill text-purple-bold"></i>
                  <input v-model="adminData.email" type="email" class="input-purple-glass">
                </div>
              </div>

              <div class="d-flex justify-content-center gap-2 mt-5">
                <div class="status-pill-purple"><span class="dot-live"></span> SYSTEM ACTIVE</div>
              </div>
            </div>
          </aside>

          <section class="col-xl-8 col-lg-7">
            <div class="row g-4">
              
              <div class="col-12">
                <div class="glass-card-purple p-4 p-md-5 overflow-hidden">
                  <div class="d-flex justify-content-between align-items-center mb-4 px-2">
                    <div>
                      <h4 class="fw-900 text-dark mb-0">Attendance Flow</h4>
                      <p class="text-muted small fw-600 m-0">Live Dynamic Trends</p>
                    </div>
                    <div class="avg-indicator-purple">98.2%</div>
                  </div>

                  <div class="mountain-container">
                    <svg viewBox="0 0 1000 300" preserveAspectRatio="none" class="mountain-svg">
                      <defs>
                        <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.6" />
                          <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,300 L0,150 Q150,50 300,180 T600,100 T1000,150 L1000,300 Z" 
                            fill="url(#mountainGrad)" class="wave-path opacity-50" />
                      <path d="M0,300 L0,200 Q200,100 400,220 T800,120 T1000,200 L1000,300 Z" 
                            fill="url(#mountainGrad)" class="wave-path" />
                    </svg>
                    <div class="d-flex justify-content-between mt-3 px-4">
                      <span class="bar-label-purple" v-for="day in ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']" :key="day">{{ day }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="glass-card-purple p-4 h-100">
                  <h6 class="fw-900 mb-4 px-2 text-dark opacity-75">KERNEL STATUS</h6>
                  <div class="monitor-box-purple mb-4">
                    <div class="d-flex justify-content-between mb-2">
                      <span class="small fw-800 text-secondary">CPU LOAD</span>
                      <span class="small fw-900 text-purple-bold">24%</span>
                    </div>
                    <div class="progress-track-purple">
                      <div class="progress-bar-purple animate-pulse-width" style="width: 24%"></div>
                    </div>
                  </div>
                  <div class="monitor-box-purple">
                    <div class="d-flex justify-content-between mb-2">
                      <span class="small fw-800 text-secondary">RAM USAGE</span>
                      <span class="small fw-900 text-purple-bold">58%</span>
                    </div>
                    <div class="progress-track-purple">
                      <div class="progress-bar-purple" style="width: 58%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="glass-card-purple p-4 h-100 d-flex flex-column justify-content-between">
                  <h6 class="fw-900 mb-4 px-2 text-dark opacity-75">QUICK SEARCH</h6>
                  <div class="command-input-purple mb-3">
                    <i class="bi bi-terminal-fill text-purple-bold"></i>
                    <input type="text" placeholder="Search student records...">
                  </div>
                  <div class="info-box-purple">
                    <div class="small fw-900 text-purple-bold"><i class="bi bi-info-circle-fill me-2"></i>AI INSIGHT</div>
                    <div class="xs-text text-secondary fw-600">Attendance is 5% higher than last week.</div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminData: {
        name: 'ADMIN JPRT',
        role: 'SYSTEM ARCHITECT',
        email: 'admin@purple.id',
        bio: 'Membangun ekosistem digital sekolah dengan standar industri dan keamanan modern.',
        profileImage: 'https://i.pravatar.cc/300?u=purple_admin'
      }
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) this.adminData.profileImage = URL.createObjectURL(file);
    },
    syncData() { 
      alert("System Deployed: Config pushed to core."); 
    }
  }
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');

/* --- LAYOUT CORE --- */
.app-container { height: 100vh; background: #f4f6fc; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; position: fixed; inset: 0; }
.content-scroll-area { flex: 1; overflow-y: auto; height: calc(100vh - 95px); }
.max-width-xl { max-width: 1250px; margin: 0 auto; }

/* --- GLASS DESIGN --- */
.glass-card-purple { 
  background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); 
  border-radius: 35px; border: 1px solid rgba(255, 255, 255, 1);
  box-shadow: 0 15px 35px rgba(79, 70, 229, 0.08);
}

/* --- BUTTONS --- */
.btn-back-modern {
  display: flex; align-items: center; gap: 12px; background: white; border: 1px solid #e2e8f0;
  padding: 8px 20px 8px 8px; border-radius: 100px; cursor: pointer; transition: 0.3s ease;
}
.btn-back-modern .icon-circle {
  width: 38px; height: 38px; background: #4f46e5; color: white; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
}
.btn-back-modern span { font-weight: 800; font-size: 0.75rem; color: #4f46e5; letter-spacing: 1px; }
.btn-back-modern:hover { transform: translateX(-5px); box-shadow: 0 10px 25px rgba(79, 70, 229, 0.2); border-color: #4f46e5; }
.btn-deploy-purple { background: #1e293b; color: #4ade80; border: none; padding: 12px 25px; border-radius: 15px; font-weight: 900; cursor: pointer; }

/* --- PROFILE IMAGE & ANIMATIONS --- */
.profile-container-circle { position: relative; width: 170px; height: 170px; margin: 0 auto; }
.profile-img-circle { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; border: 6px solid white; position: relative; z-index: 2; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
.pulse-ring-purple { position: absolute; inset: -8px; border-radius: 50%; border: 3px solid #6366f1; animation: pulsePurple 2s infinite; }
.edit-btn-purple { position: absolute; bottom: 8px; right: 12px; width: 45px; height: 45px; background: #4f46e5; color: white; border-radius: 50%; border: 4px solid white; display: flex; align-items: center; justify-content: center; z-index: 10; cursor: pointer; }

/* --- FORM ELEMENTS --- */
.input-name-purple { width: 100%; background: transparent; border: none; outline: none; text-align: center; font-weight: 900; font-size: 1.8rem; color: #1e293b; }
.input-role-purple { background: transparent; border: none; outline: none; font-weight: 800; font-size: 0.8rem; color: #4338ca; text-transform: uppercase; letter-spacing: 1px; }
.textarea-purple-glass { width: 100%; background: rgba(79, 70, 229, 0.05); border: 1px solid rgba(79, 70, 229, 0.1); border-radius: 20px; padding: 15px; font-size: 0.9rem; font-weight: 600; color: #334155; min-height: 90px; resize: none; outline: none; }
.input-wrapper-purple { background: rgba(79, 70, 229, 0.05); border: 1px solid rgba(79, 70, 229, 0.1); border-radius: 15px; display: flex; align-items: center; padding: 12px 15px; gap: 10px; }
.input-purple-glass { background: transparent; border: none; outline: none; width: 100%; font-weight: 700; color: #334155; }
.label-purple { font-size: 0.7rem; font-weight: 900; color: #64748b; letter-spacing: 1.5px; margin-bottom: 8px; margin-left: 5px; display: block; }

/* --- MOUNTAIN GRAPH ANIMATION (SANGAT PENTING) --- */
.mountain-container { position: relative; width: 100%; height: 220px; margin-top: 20px; }
.mountain-svg { width: 100%; height: 100%; }
.wave-path { 
  animation: waveFlow 8s infinite ease-in-out; 
  transform-box: fill-box;
}
.wave-path.opacity-50 { 
  animation-delay: -4s; 
  opacity: 0.3; 
}

@keyframes waveFlow { 
  0%, 100% { 
    d: path("M0,300 L0,150 Q150,50 300,180 T600,100 T1000,150 L1000,300 Z"); 
  } 
  50% { 
    d: path("M0,300 L0,180 Q150,100 300,150 T600,150 T1000,180 L1000,300 Z"); 
  } 
}

/* --- UTILS & STATUS --- */
.status-pill-purple { background: #1e293b; color: white; padding: 8px 18px; border-radius: 50px; font-size: 0.7rem; font-weight: 900; display: flex; align-items: center; gap: 8px; }
.dot-live { width: 8px; height: 8px; background: #4ade80; border-radius: 50%; box-shadow: 0 0 10px #4ade80; animation: blink 1s infinite; }
.progress-track-purple { width: 100%; height: 10px; background: #e2e8f0; border-radius: 10px; }
.progress-bar-purple { height: 100%; background: #4f46e5; border-radius: 10px; }
.avg-indicator-purple { background: #1e293b; color: #4ade80; padding: 10px 20px; border-radius: 15px; font-weight: 900; }
.bar-label-purple { font-size: 0.7rem; font-weight: 800; color: #94a3b8; }

/* --- GLOBAL & KEYFRAME ANIMATIONS --- */
@keyframes pulsePurple { 0% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.15); opacity: 0; } 100% { transform: scale(1); opacity: 0.4; } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.animate-fade-in { animation: fadeIn 0.6s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* --- ADDITIONAL UI FROM RIFKY --- */
.avatar-container { position: relative; width: 160px; height: 160px; margin: 0 auto; }
.profile-image-wrapper {
  position: relative; width: 100%; height: 100%; border-radius: 50%;
  overflow: hidden; border: 6px solid white; box-shadow: 0 10px 30px rgba(0,0,0,0.1); z-index: 2;
}
.edit-badge {
  position: absolute; bottom: 5px; right: 5px; background: #4f46e5; color: white;
  width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center;
  justify-content: center; border: 4px solid white; z-index: 3; cursor: pointer;
  transition: 0.2s;
}
.btn-save-action {
  flex: 2; background: #4f46e5; color: white; border: none;
  padding: 18px; border-radius: 20px; font-weight: 700; transition: 0.3s;
}
.btn-cancel {
  flex: 1; background: #f1f5f9; color: #64748b; border: none;
  padding: 18px; border-radius: 20px; font-weight: 700; transition: 0.3s;
}
</style>