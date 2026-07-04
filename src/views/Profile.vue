<template>
  <div class="app-container animate-fade-in">
    <header class="header-glass py-3 px-md-5">
      <div class="d-flex justify-content-between align-items-center">
        
        <button class="btn-back-modern ripple" @click="$router.push('/dashboard')">
          <div class="icon-circle">
            <i class="bi bi-arrow-left"></i>
          </div>
          <span>DASHBOARD</span>
        </button>

        <div class="header-center text-center">
          <div class="brand-logo-purple shadow-premium">AJ</div>
          <h2 class="admin-title-purple mt-2">SYSTEM ARCHITECT</h2>
        </div>

        <button class="btn-deploy-purple ripple shadow-sm" @click="syncData">
          <i class="bi bi-lightning-charge-fill me-2"></i>
          DEPLOY
        </button>

      </div>
    </header>

    <main class="content-scroll-area p-3 p-md-5">
      <div class="container-fluid max-width-xl">

        <div class="row g-4">

          <aside class="col-xl-4 col-lg-5">

            <div class="glass-card-purple p-5 text-center h-100 profile-main-card">

              <div class="profile-container-circle mb-4">
                <div class="pulse-ring-purple"></div>
                <div class="pulse-ring-purple ring-2"></div>
                
                <img
                  :src="adminData.profileImage"
                  class="profile-img-circle"
                  alt="Profile"
                >

                <label class="edit-btn-purple ripple">
                  <i class="bi bi-camera-fill"></i>
                  <input type="file" hidden @change="onFileChange">
                </label>
              </div>

              <div class="input-name-wrapper mb-2">
                <input
                  v-model="adminData.name"
                  class="input-name-purple"
                  placeholder="Admin Name"
                >
                <div class="focus-line"></div>
              </div>

              <div class="role-wrapper mb-4">
                <div class="role-dot"></div>
                <input
                  v-model="adminData.role"
                  class="input-role-purple"
                  placeholder="Role/Position"
                >
              </div>

              <hr class="card-divider">

              <div class="field-group-purple text-start">
                <label class="label-purple">
                  <i class="bi bi-terminal me-1"></i> SYSTEM MANIFESTO
                </label>
                <textarea
                  v-model="adminData.bio"
                  class="textarea-purple-glass"
                  placeholder="Write system manifesto..."
                ></textarea>
              </div>

              <div class="field-group-purple mt-4 text-start">
                <label class="label-purple">
                  <i class="bi bi-shield-lock me-1"></i> SECURE ENDPOINT
                </label>
                <div class="input-wrapper-purple">
                  <i class="bi bi-envelope text-purple-bold"></i>
                  <input
                    v-model="adminData.email"
                    class="input-purple-glass"
                    placeholder="secure@endpoint.id"
                  >
                </div>
              </div>

              <div class="d-flex justify-content-center mt-5">
                <div class="status-pill-purple">
                  <div class="dot-live"></div>
                  <span>SYSTEM ACTIVE</span>
                </div>
              </div>

            </div>

          </aside>

          <section class="col-xl-8 col-lg-7">
            <div class="row g-4">

              <div class="col-12">
                <div class="glass-card-purple p-4 option-card-glow">
                  
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h4 class="metrics-heading">Attendance Flow</h4>
                      <small class="metrics-sub">Live Dynamic Trends</small>
                    </div>
                    <div class="avg-indicator-purple">
                      <i class="bi bi-cpu me-1"></i> 98.2%
                    </div>
                  </div>

                  <div class="mountain-container">
                    <svg viewBox="0 0 1000 240" class="mountain-svg">
                      <defs>
                        <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:0.35" />
                          <stop offset="100%" style="stop-color:#818cf8;stop-opacity:0.0" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      <path class="wave-bg" fill="url(#mountainGrad)" />
                      
                      <path class="wave-line" fill="none" stroke="#4f46e5" stroke-width="3" filter="url(#glow)" />
                    </svg>
                  </div>

                </div>
              </div>

              <div class="col-md-6">
                <div class="glass-card-purple p-4 h-100">
                  <h6 class="metrics-sub-title"><i class="bi bi-cpu text-purple-bold me-2"></i>CPU LOAD</h6>
                  <div class="progress-track-purple mb-4">
                    <div class="progress-bar-purple" style="width:24%">
                      <div class="progress-shine"></div>
                    </div>
                  </div>

                  <h6 class="metrics-sub-title"><i class="bi bi-memory text-purple-bold me-2"></i>RAM USAGE</h6>
                  <div class="progress-track-purple">
                    <div class="progress-bar-purple" style="width:58%">
                      <div class="progress-shine"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="glass-card-purple p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h6 class="metrics-sub-title"><i class="bi bi-lightning text-purple-bold me-2"></i>QUICK COMMAND</h6>
                    <div class="command-input-purple">
                      <i class="bi bi-search text-purple-bold"></i>
                      <input placeholder="Execute command or search...">
                    </div>
                  </div>

                  <div class="info-box-purple mt-3">
                    <div class="d-flex align-items-center gap-2">
                      <i class="bi bi-graph-up-arrow text-success-bold"></i>
                      <span>Attendance naik <strong>5%</strong> dibanding minggu lalu</span>
                    </div>
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
        bio: 'Membangun ekosistem digital sekolah modern berkemampuan tinggi.',
        profileImage: 'https://i.pravatar.cc/300'
      }
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.adminData.profileImage = URL.createObjectURL(file)
      }
    },
    syncData() {
      alert("System deployment successful.")
    }
  }
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

*{
  box-sizing:border-box;
  font-family:'Plus Jakarta Sans',sans-serif;
}

.app-container{
  min-height:100vh;
  background: linear-gradient(135deg, #f4f6fa 0%, #eaedf6 100%);
}

.content-scroll-area{
  overflow-y:auto;
  height:calc(100vh - 90px);
}

.max-width-xl{
  max-width:1300px;
  margin:auto;
}

/* GLOBAL RIPPLE & FX */
.ripple {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.ripple:active {
  transform: scale(0.96);
  opacity: 0.85;
}

/* HEADER */
.header-glass{
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.7);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.brand-logo-purple{
  width:48px;
  height:48px;
  border-radius:14px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  font-weight:800;
  font-size:18px;
  margin:auto;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.admin-title-purple{
  font-size:16px;
  font-weight:800;
  color:#0f172a;
  letter-spacing: 1px;
}

.btn-back-modern{
  display:flex;
  align-items:center;
  gap:10px;
  padding:8px 18px;
  border:1px solid rgba(229, 231, 235, 0.8);
  background: rgba(255, 255, 255, 0.6);
  border-radius:14px;
  font-weight:700;
  font-size: 0.85rem;
  color: #4f46e5;
  cursor:pointer;
}

.btn-back-modern:hover {
  background: #4f46e5;
  color: white;
}

.btn-back-modern:hover .icon-circle {
  background: white;
  color: #4f46e5;
}

.icon-circle{
  width:26px;
  height:26px;
  background:#4f46e5;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  transition: all 0.2s ease;
}

.btn-deploy-purple{
  border:none;
  background: linear-gradient(135deg, #4f46e5, #4338ca);
  color:white;
  padding:12px 22px;
  border-radius:14px;
  font-weight:700;
  font-size: 0.9rem;
  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.2);
}

.btn-deploy-purple:hover {
  background: linear-gradient(135deg, #4338ca, #3730a3);
  box-shadow: 0 12px 24px rgba(79, 70, 229, 0.3);
  transform: translateY(-1px);
}

/* PREMIUM GLASS CARD */
.glass-card-purple{
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(16px);
  border-radius:28px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.03), 0 5px 15px rgba(79, 70, 229, 0.02);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
}

.glass-card-purple:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05), 0 8px 20px rgba(79, 70, 229, 0.04);
}

.profile-main-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.75) 100%);
}

.card-divider {
  border: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(229,231,235,0) 0%, rgba(229,231,235,1) 50%, rgba(229,231,235,0) 100%);
  margin: 25px 0;
}

/* INTERACTIVE PROFILE IMAGE */
.profile-container-circle{
  position:relative;
  width:150px;
  height:150px;
  margin:auto;
}

.profile-img-circle{
  width:150px;
  height:150px;
  border-radius:50%;
  object-fit:cover;
  border:6px solid white;
  display:block;
  box-shadow:0 12px 28px rgba(0,0,0,0.08);
  position: relative;
  z-index: 2;
}

.pulse-ring-purple{
  position:absolute;
  width:170px;
  height:170px;
  top:-10px;
  left:-10px;
  border-radius:50%;
  background:rgba(79,70,229,.1);
  animation:pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  z-index: 1;
}

.pulse-ring-purple.ring-2 {
  animation-delay: 1.25s;
}

@keyframes pulse{
  0%{ transform:scale(.92); opacity:1; }
  100%{ transform:scale(1.15); opacity:0; }
}

.edit-btn-purple{
  position:absolute;
  bottom:4px;
  right:4px;
  width:40px;
  height:40px;
  border-radius:50%;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color:white;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  border:4px solid white;
  box-shadow: 0 4px 10px rgba(79,70,229,0.3);
  z-index: 3;
}

/* GLASS INPUT MODERNIZATION */
.input-name-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input-name-purple{
  width:100%;
  border:none;
  font-size:24px;
  font-weight:800;
  text-align:center;
  background:none;
  outline:none;
  color: #0f172a;
  padding: 4px;
}

.input-name-purple:focus + .focus-line {
  width: 60%;
}

.focus-line {
  height: 2px;
  width: 0%;
  background: #4f46e5;
  margin: auto;
  transition: width 0.3s ease;
}

.role-wrapper{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:8px;
}

.role-dot{
  width:8px;
  height:8px;
  background:#10b981;
  border-radius:50%;
  box-shadow: 0 0 8px #10b981;
}

.input-role-purple{
  border:none;
  background:none;
  text-align:center;
  font-weight:700;
  font-size: 0.9rem;
  color:#4f46e5;
  outline:none;
  letter-spacing: 0.5px;
}

.label-purple{
  font-size:.72rem;
  font-weight:800;
  color:#64748b;
  margin-bottom:8px;
  display:block;
  letter-spacing: 0.5px;
}

.textarea-purple-glass{
  width:100%;
  height:95px;
  border: 2px solid #f1f5f9;
  border-radius:16px;
  padding:14px;
  resize:none;
  outline:none;
  background: rgba(248, 250, 252, 0.7);
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
  transition: all 0.2s ease;
}

.textarea-purple-glass:focus,
.input-wrapper-purple:focus-within,
.command-input-purple:focus-within {
  border-color:#4f46e5;
  background:white;
  box-shadow:0 0 0 4px rgba(79,70,229,.08);
}

.input-wrapper-purple{
  display:flex;
  align-items:center;
  gap:12px;
  border: 2px solid #f1f5f9;
  border-radius:16px;
  padding:14px 16px;
  background: rgba(248, 250, 252, 0.7);
  transition: all 0.2s ease;
}

.input-purple-glass{
  width:100%;
  border:none;
  outline:none;
  background:none;
  font-size: 0.9rem;
  font-weight: 700;
  color: #334155;
}

/* LIVE STATUS PILL */
.status-pill-purple{
  padding:10px 20px;
  border-radius:50px;
  background:#dcfce7;
  color: #15803d;
  font-size:12px;
  font-weight:800;
  display:flex;
  align-items:center;
  gap:8px;
  letter-spacing: 0.5px;
  border: 1px solid rgba(21, 128, 61, 0.1);
}

.dot-live{
  width:8px;
  height:8px;
  border-radius:50%;
  background:#10b981;
  box-shadow: 0 0 10px #10b981;
  animation: live-blink 1.5s infinite ease-in-out;
}

@keyframes live-blink {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* METRICS & LIVE MORPHING GRAPH */
.metrics-heading {
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.metrics-sub {
  font-weight: 700;
  color: #94a3b8;
}

.metrics-sub-title {
  font-size: 0.75rem;
  font-weight: 800;
  color: #64748b;
  margin-bottom: 14px;
}

.mountain-container {
  height: 200px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.mountain-svg {
  width: 100%;
  overflow: visible;
}

.wave-bg {
  animation: waveMotionBg 8s ease-in-out infinite alternate;
}

.wave-line {
  animation: waveMotionLine 8s ease-in-out infinite alternate;
}

/* Manipulasi Vektor Organik */
@keyframes waveMotionBg {
  0% {
    d: path("M0,240 L0,120 Q150,40 300,150 T600,60 T1000,100 L1000,240 L0,240 Z");
  }
  50% {
    d: path("M0,240 L0,90 Q180,140 350,70 T700,130 T1000,120 L1000,240 L0,240 Z");
  }
  100% {
    d: path("M0,240 L0,140 Q130,80 280,110 T550,150 T1000,80 L1000,240 L0,240 Z");
  }
}

@keyframes waveMotionLine {
  0% {
    d: path("M0,120 Q150,40 300,150 T600,60 T1000,100");
  }
  50% {
    d: path("M0,90 Q180,140 350,70 T700,130 T1000,120");
  }
  100% {
    d: path("M0,140 Q130,80 280,110 T550,150 T1000,80");
  }
}

.avg-indicator-purple{
  padding:8px 16px;
  background:#eef2ff;
  border-radius:14px;
  font-weight:800;
  font-size: 0.9rem;
  color:#4f46e5;
  border: 1px solid rgba(79, 70, 229, 0.1);
}

/* PROGRESS BAR GLOW & SHINE */
.progress-track-purple{
  height:12px;
  background:#f1f5f9;
  border-radius:100px;
  overflow:hidden;
  border: 1px solid #e2e8f0;
}

.progress-bar-purple{
  height:100%;
  background: linear-gradient(90deg, #6366f1, #4f46e5);
  border-radius:100px;
  position: relative;
}

.progress-shine {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shine 2.5s infinite linear;
}

@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* COMMAND INPUT */
.command-input-purple{
  display:flex;
  align-items:center;
  gap:12px;
  padding:14px 16px;
  border: 2px solid #f1f5f9;
  border-radius:16px;
  background: rgba(248, 250, 252, 0.7);
  transition: all 0.2s ease;
}

.command-input-purple input{
  border:none;
  outline:none;
  background:none;
  width:100%;
  font-size: 0.9rem;
  font-weight: 700;
  color: #334155;
}

.info-box-purple{
  padding:16px;
  background: rgba(239, 246, 255, 0.6);
  border-radius:16px;
  font-size: 0.88rem;
  font-weight: 700;
  color: #1e3a8a;
  border: 1px solid rgba(191, 219, 254, 0.5);
}

.text-purple-bold{
  color:#4f46e5;
}

.text-success-bold {
  color: #10b981;
  font-size: 1.1rem;
}

/* SHADOWS & ANIMATIONS */
.shadow-premium {
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.15);
}

.animate-fade-in{
  animation:fadeIn .5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn{
  from{ opacity:0; transform: translateY(4px); }
  to{ opacity:1; transform: translateY(0); }
}
</style>