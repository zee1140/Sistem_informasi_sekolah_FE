<template>
  <div class="app-container animate-fade-in">
    <header class="header-glass py-3 px-md-5">
      <div class="d-flex justify-content-between align-items-center">
        
        <button class="btn-back-modern" @click="$router.push('/dashboard')">
          <div class="icon-circle">
            <i class="bi bi-arrow-left-short"></i>
          </div>
          <span>DASHBOARD</span>
        </button>

        <div class="header-center text-center">
          <div class="brand-logo-purple">AJ</div>
          <h2 class="admin-title-purple mt-2">SYSTEM ARCHITECT</h2>
        </div>

        <button class="btn-deploy-purple" @click="syncData">
          <i class="bi bi-lightning-charge-fill me-2"></i>
          DEPLOY
        </button>

      </div>
    </header>

    <main class="content-scroll-area p-3 p-md-5">
      <div class="container-fluid max-width-xl">

        <div class="row g-4">

          <!-- LEFT -->

          <aside class="col-xl-4 col-lg-5">

            <div class="glass-card-purple p-5 text-center h-100">

              <div class="profile-container-circle mb-4">

                <div class="pulse-ring-purple"></div>

                <img
                  :src="adminData.profileImage"
                  class="profile-img-circle"
                >

                <label class="edit-btn-purple">
                  <i class="bi bi-camera-fill"></i>
                  <input type="file" hidden @change="onFileChange">
                </label>

              </div>

              <input
                v-model="adminData.name"
                class="input-name-purple mb-2"
              >

              <div class="role-wrapper mb-4">

                <div class="role-dot"></div>

                <input
                  v-model="adminData.role"
                  class="input-role-purple"
                >

              </div>


              <div class="field-group-purple text-start">

                <label class="label-purple">
                  SYSTEM MANIFESTO
                </label>

                <textarea
                  v-model="adminData.bio"
                  class="textarea-purple-glass"
                ></textarea>

              </div>


              <div class="field-group-purple mt-4 text-start">

                <label class="label-purple">
                  SECURE ENDPOINT
                </label>

                <div class="input-wrapper-purple">

                  <i class="bi bi-envelope text-purple-bold"></i>

                  <input
                    v-model="adminData.email"
                    class="input-purple-glass"
                  >

                </div>

              </div>

              <div class="d-flex justify-content-center mt-4">

                <div class="status-pill-purple">

                  <div class="dot-live"></div>

                  SYSTEM ACTIVE

                </div>

              </div>

            </div>

          </aside>


          <!-- RIGHT -->

          <section class="col-xl-8 col-lg-7">

            <div class="row g-4">

              <div class="col-12">

                <div class="glass-card-purple p-4">

                  <div class="d-flex justify-content-between mb-4">

                    <div>

                      <h4>Attendance Flow</h4>
                      <small>Live Dynamic Trends</small>

                    </div>

                    <div class="avg-indicator-purple">
                      98.2%
                    </div>

                  </div>


                  <div class="mountain-container">

                    <svg
                      viewBox="0 0 1000 300"
                      class="mountain-svg"
                    >

                      <defs>

                        <linearGradient
                          id="mountainGrad"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >

                          <stop
                            offset="0%"
                            style="stop-color:#4f46e5;stop-opacity:0.5"
                          />

                          <stop
                            offset="100%"
                            style="stop-color:#4f46e5;stop-opacity:0"
                          />

                        </linearGradient>

                      </defs>

                      <path
                        d="M0,300 L0,150 Q150,50 300,180 T600,100 T1000,150 L1000,300 Z"
                        fill="url(#mountainGrad)"
                        class="wave-path"
                      />

                    </svg>

                  </div>

                </div>

              </div>


              <div class="col-md-6">

                <div class="glass-card-purple p-4 h-100">

                  <h6>CPU LOAD</h6>

                  <div class="progress-track-purple">

                    <div
                      class="progress-bar-purple"
                      style="width:24%"
                    ></div>

                  </div>

                  <br>

                  <h6>RAM USAGE</h6>

                  <div class="progress-track-purple">

                    <div
                      class="progress-bar-purple"
                      style="width:58%"
                    ></div>

                  </div>

                </div>

              </div>


              <div class="col-md-6">

                <div class="glass-card-purple p-4 h-100">

                  <h6>QUICK SEARCH</h6>

                  <div class="command-input-purple">

                    <i class="bi bi-search"></i>

                    <input
                      placeholder="Search..."
                    >

                  </div>

                  <div class="info-box-purple">

                    Attendance naik 5%
                    dibanding minggu lalu

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
export default{

data(){

return{

adminData:{

name:'ADMIN JPRT',
role:'SYSTEM ARCHITECT',
email:'admin@purple.id',
bio:'Membangun ekosistem digital sekolah modern.',
profileImage:'https://i.pravatar.cc/300'

}

}

},

methods:{

onFileChange(e){

const file=e.target.files[0]

if(file){

this.adminData.profileImage=
URL.createObjectURL(file)

}

},

syncData(){

alert("System deployed")

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
background:#f8fafc;
}

.content-scroll-area{
overflow-y:auto;
height:calc(100vh - 90px);
}

.max-width-xl{
max-width:1300px;
margin:auto;
}

/* HEADER */

.header-glass{
background:#fff;
border-bottom:1px solid #e5e7eb;
}

.brand-logo-purple{
width:50px;
height:50px;
border-radius:14px;
background:#4f46e5;
display:flex;
align-items:center;
justify-content:center;
color:white;
font-weight:800;
font-size:18px;
margin:auto;
}

.admin-title-purple{
font-size:18px;
font-weight:800;
color:#111827;
}

.btn-back-modern{
display:flex;
align-items:center;
gap:12px;
background:white;
border:1px solid #e2e8f0;
padding:8px 20px 8px 8px;
border-radius:100px;
cursor:pointer;
transition:.3s;
}

.btn-back-modern:hover{
transform:translateX(-5px);
box-shadow:0 10px 25px rgba(79,70,229,.2);
}

.icon-circle{
width:38px;
height:38px;
background:#4f46e5;
color:white;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
font-size:1.4rem;
}

.btn-back-modern span{
font-size:.75rem;
font-weight:800;
letter-spacing:1px;
color:#4f46e5;
}

.btn-deploy-purple{
background:#4f46e5;
color:white;
border:none;
padding:12px 25px;
border-radius:15px;
font-weight:800;
cursor:pointer;
}

/* CARD */

.glass-card-purple{
background:white;
border-radius:24px;
border:1px solid #edf2f7;
box-shadow:0 5px 20px rgba(0,0,0,.04);
}

/* PROFILE */

.profile-container-circle{
position:relative;
width:170px;
height:170px;
margin:auto;
}

.profile-img-circle{
width:100%;
height:100%;
object-fit:cover;
border-radius:50%;
border:6px solid white;
box-shadow:0 10px 25px rgba(0,0,0,.1);
position:relative;
z-index:2;
}

.pulse-ring-purple{
position:absolute;
inset:-8px;
border-radius:50%;
border:3px solid #6366f1;
animation:pulsePurple 2s infinite;
}

.edit-btn-purple{
position:absolute;
bottom:8px;
right:12px;
width:45px;
height:45px;
background:#4f46e5;
color:white;
border-radius:50%;
border:4px solid white;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
z-index:10;
}

.input-name-purple{
width:100%;
background:transparent;
border:none;
outline:none;
text-align:center;
font-size:1.8rem;
font-weight:900;
color:#1e293b;
}

.role-wrapper{
display:flex;
justify-content:center;
align-items:center;
gap:8px;
}

.role-dot{
width:10px;
height:10px;
border-radius:50%;
background:#10b981;
}

.input-role-purple{
border:none;
background:none;
outline:none;
font-weight:800;
color:#4338ca;
text-align:center;
}

.label-purple{
font-size:.7rem;
font-weight:900;
color:#64748b;
letter-spacing:1px;
display:block;
margin-bottom:8px;
}

.textarea-purple-glass{
width:100%;
min-height:90px;
padding:15px;
border-radius:20px;
border:1px solid rgba(79,70,229,.1);
background:rgba(79,70,229,.05);
outline:none;
resize:none;
}

.input-wrapper-purple{
display:flex;
align-items:center;
gap:10px;
padding:12px 15px;
border-radius:15px;
background:rgba(79,70,229,.05);
border:1px solid rgba(79,70,229,.1);
}

.input-purple-glass{
width:100%;
border:none;
background:none;
outline:none;
}

/* STATUS */

.status-pill-purple{
padding:10px 18px;
border-radius:50px;
background:#ecfdf5;
font-size:13px;
font-weight:700;
display:flex;
align-items:center;
gap:10px;
}

.dot-live{
width:8px;
height:8px;
border-radius:50%;
background:#10b981;
animation:blink 1s infinite;
}

/* CHART */

.mountain-container{
position:relative;
height:220px;
margin-top:20px;
}

.mountain-svg{
width:100%;
height:100%;
}

.wave-path{
animation:waveFlow 8s infinite ease-in-out;
}

.avg-indicator-purple{
padding:8px 15px;
background:#eef2ff;
border-radius:12px;
font-weight:800;
color:#4f46e5;
}

/* PROGRESS */

.progress-track-purple{
height:10px;
background:#e5e7eb;
border-radius:100px;
overflow:hidden;
}

.progress-bar-purple{
height:100%;
background:#4f46e5;
border-radius:100px;
}

/* SEARCH */

.command-input-purple{
display:flex;
align-items:center;
gap:10px;
padding:14px;
border-radius:14px;
border:1px solid #e5e7eb;
background:#fafafa;
}

.command-input-purple input{
border:none;
background:none;
outline:none;
width:100%;
}

.info-box-purple{
padding:15px;
margin-top:15px;
border-radius:14px;
background:#f8fafc;
}

.text-purple-bold{
color:#4f46e5;
}

/* ANIMATION */

@keyframes pulsePurple{
0%{transform:scale(1);opacity:.4}
50%{transform:scale(1.15);opacity:0}
100%{transform:scale(1);opacity:.4}
}

@keyframes blink{
0%,100%{opacity:1}
50%{opacity:.4}
}

@keyframes waveFlow{
0%{transform:translateY(0)}
50%{transform:translateY(-10px)}
100%{transform:translateY(0)}
}

.animate-fade-in{
animation:fadeIn .6s ease-out;
}

@keyframes fadeIn{
from{
opacity:0;
transform:translateY(10px);
}
to{
opacity:1;
transform:translateY(0);
}
}
</style>