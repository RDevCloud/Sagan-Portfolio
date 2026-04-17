/* =============================================
   Interactive Mini-Demo System
   Each demo is a self-contained mini-app inside a modal
   ============================================= */

function openDemo(type) {
    const overlay = document.getElementById('demoOverlay');
    const title = document.getElementById('demoTitle');
    const body = document.getElementById('demoBody');

    const demos = {
        referral: { title: 'Multi-Specialty Referral System', render: renderReferralDemo },
        operations: { title: 'Healthcare Operations Dashboard', render: renderOperationsDemo },
        routing: { title: 'Referral Routing Engine', render: renderRoutingDemo },
        esign: { title: 'E-Signature Workflow', render: renderEsignDemo },
        telehealth: { title: 'Telehealth & Virtual Care Platform', render: renderTelehealthDemo }
    };

    const demo = demos[type];
    if (!demo) return;

    title.textContent = demo.title;
    body.innerHTML = '';
    demo.render(body);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDemo(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById('demoOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDemo(); });

/* ==========================================
   DEMO 1: Multi-Specialty Referral System
   ========================================== */
function renderReferralDemo(container) {
    container.innerHTML = `
        <div class="mini-app">
            <div class="mini-header">
                <div class="mini-logo"><i class="fas fa-notes-medical"></i> Referral Portal</div>
                <div class="mini-user"><i class="fas fa-user-md"></i> Dr. Example &nbsp;<span class="mini-tag-green">Online</span></div>
            </div>
            <div class="mini-body">
                <div class="mini-sidebar">
                    <div class="mini-nav-item active" onclick="showReferralView('form', this)"><i class="fas fa-plus-circle"></i> New Referral</div>
                    <div class="mini-nav-item" onclick="showReferralView('db', this)"><i class="fas fa-database"></i> Patient Database</div>
                </div>
                <div class="mini-content" id="referralContent">
                    <h4>Patient Demographics</h4>
                    <div class="mini-form-grid">
                        <div class="mini-field">
                            <label>Full Name</label>
                            <input type="text" value="Jane Doe" readonly>
                        </div>
                        <div class="mini-field">
                            <label>Date of Birth</label>
                            <input type="text" value="03/15/1990" readonly>
                        </div>
                        <div class="mini-field">
                            <label>Phone</label>
                            <input type="text" value="(555) 123-4567" readonly>
                        </div>
                        <div class="mini-field">
                            <label>Date of Injury</label>
                            <input type="text" value="01/10/2026" readonly>
                        </div>
                    </div>
                    <h4 style="margin-top:1.2rem">Select Specialties</h4>
                    <div class="mini-checkbox-grid" id="specialtyGrid">
                        <label class="mini-checkbox"><input type="checkbox" checked><span class="checkmark"></span> Specialty A — Eval</label>
                        <label class="mini-checkbox"><input type="checkbox"><span class="checkmark"></span> Specialty B — Eval</label>
                        <label class="mini-checkbox"><input type="checkbox" checked><span class="checkmark"></span> Specialty C — Therapy</label>
                        <label class="mini-checkbox"><input type="checkbox"><span class="checkmark"></span> Specialty D — Neuro</label>
                        <label class="mini-checkbox"><input type="checkbox" checked><span class="checkmark"></span> Specialty E — Rehab</label>
                        <label class="mini-checkbox"><input type="checkbox"><span class="checkmark"></span> Specialty F — Psych</label>
                        <label class="mini-checkbox"><input type="checkbox"><span class="checkmark"></span> Specialty G — Imaging</label>
                        <label class="mini-checkbox"><input type="checkbox"><span class="checkmark"></span> Equipment H — Unit</label>
                        <label class="mini-checkbox"><input type="checkbox"><span class="checkmark"></span> Equipment I — Device</label>
                        <label class="mini-checkbox"><input type="checkbox"><span class="checkmark"></span> Equipment J — Support</label>
                        <label class="mini-checkbox"><input type="checkbox"><span class="checkmark"></span> Equipment K — Brace</label>
                        <label class="mini-checkbox"><input type="checkbox"><span class="checkmark"></span> Specialty L — Rx</label>
                    </div>
                    <div class="mini-selected-count"><i class="fas fa-file-alt"></i> <span id="selectedCount">3</span> templates will be generated</div>
                    <button class="mini-btn-primary" onclick="simulateReferralSubmit()"><i class="fas fa-paper-plane"></i> Submit & Generate E-Signature</button>
                </div>
            </div>
        </div>
    `;

    container.querySelectorAll('#specialtyGrid input[type=checkbox]').forEach(cb => {
        cb.addEventListener('change', () => {
            const count = container.querySelectorAll('#specialtyGrid input:checked').length;
            document.getElementById('selectedCount').textContent = count;
        });
    });
}

function showReferralView(view, navEl) {
    const content = document.getElementById('referralContent');
    document.querySelectorAll('.mini-nav-item').forEach(n => n.classList.remove('active'));
    navEl.classList.add('active');

    if (view === 'db') {
        content.innerHTML = `
            <h4>Patient Database <span style="font-size:0.75rem;color:#8b949e;font-weight:400">— Provider: Dr. Example</span></h4>
            <div class="mini-table-wrapper" style="margin-top:0.8rem">
                <table class="mini-table">
                    <thead><tr><th>Patient</th><th>Date</th><th>Specialties</th><th>Status</th></tr></thead>
                    <tbody>
                        <tr><td><i class="fas fa-user-circle" style="color:#58a6ff"></i> Patient J.D.</td><td>04/15/2026</td><td>3 referrals</td><td><span class="mini-status mini-status-complete">Signed</span></td></tr>
                        <tr><td><i class="fas fa-user-circle" style="color:#58a6ff"></i> Patient M.R.</td><td>04/14/2026</td><td>2 referrals</td><td><span class="mini-status mini-status-complete">Signed</span></td></tr>
                        <tr><td><i class="fas fa-user-circle" style="color:#58a6ff"></i> Patient A.L.</td><td>04/12/2026</td><td>5 referrals</td><td><span class="mini-status mini-status-pending">Awaiting</span></td></tr>
                        <tr><td><i class="fas fa-user-circle" style="color:#58a6ff"></i> Patient K.W.</td><td>04/10/2026</td><td>1 referral</td><td><span class="mini-status mini-status-complete">Signed</span></td></tr>
                        <tr><td><i class="fas fa-user-circle" style="color:#58a6ff"></i> Patient S.B.</td><td>04/08/2026</td><td>4 referrals</td><td><span class="mini-status mini-status-active">In Progress</span></td></tr>
                    </tbody>
                </table>
            </div>
            <div style="margin-top:0.8rem;display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:0.75rem;color:#8b949e">Showing 5 of 47 records</span>
                <span style="font-size:0.75rem;color:#3fb950"><i class="fas fa-shield-alt"></i> Multi-tenant isolation active</span>
            </div>
        `;
    } else {
        renderReferralDemo(document.querySelector('.demo-modal-body'));
    }
}

function simulateReferralSubmit() {
    const content = document.getElementById('referralContent');
    const count = document.querySelectorAll('#specialtyGrid input:checked').length;
    content.innerHTML = `
        <div class="mini-success-screen">
            <div class="mini-success-icon"><i class="fas fa-check-circle"></i></div>
            <h3>Envelope Created Successfully</h3>
            <p>${count} templates assembled into a composite envelope</p>
            <div class="mini-progress-bar">
                <div class="mini-progress-fill" id="sigProgress"></div>
            </div>
            <p class="mini-progress-label" id="sigLabel">Opening signing ceremony...</p>
            <div class="mini-envelope-list">
                ${Array.from({length: Math.min(count, 5)}, (_, i) => `
                    <div class="mini-env-item"><i class="fas fa-file-medical"></i> Template ${String.fromCharCode(65+i)} — Document ${i+1} <span class="mini-tag-pending">Awaiting</span></div>
                `).join('')}
            </div>
        </div>
    `;
    setTimeout(() => { document.getElementById('sigProgress').style.width = '40%'; document.getElementById('sigLabel').textContent = 'Physician reviewing documents...'; }, 800);
    setTimeout(() => { document.getElementById('sigProgress').style.width = '75%'; document.getElementById('sigLabel').textContent = 'Applying digital signature...'; }, 2000);
    setTimeout(() => {
        document.getElementById('sigProgress').style.width = '100%';
        document.getElementById('sigLabel').textContent = 'All documents signed!';
        document.querySelectorAll('.mini-tag-pending').forEach(t => { t.className = 'mini-tag-complete'; t.textContent = 'Signed'; });
    }, 3200);
}

/* ==========================================
   DEMO 2: Operations Dashboard
   ========================================== */
function renderOperationsDemo(container) {
    const patients = [
        { name: 'Patient A.M.', status: 'Intake Complete', statusClass: 'complete', provider: 'Dr. Smith', time: '9:00 AM' },
        { name: 'Patient R.G.', status: 'Awaiting Signature', statusClass: 'pending', provider: 'Dr. Johnson', time: '10:30 AM' },
        { name: 'Patient L.K.', status: 'In Treatment', statusClass: 'active', provider: 'Dr. Smith', time: '11:15 AM' },
        { name: 'Patient D.W.', status: 'Scheduled', statusClass: 'scheduled', provider: 'Dr. Patel', time: '1:00 PM' },
        { name: 'Patient M.S.', status: 'Documents Ready', statusClass: 'complete', provider: 'Dr. Johnson', time: '2:30 PM' },
        { name: 'Patient C.R.', status: 'New Intake', statusClass: 'new', provider: 'Dr. Patel', time: '3:45 PM' },
    ];

    container.innerHTML = `
        <div class="mini-app">
            <div class="mini-header">
                <div class="mini-logo"><i class="fas fa-hospital"></i> Operations Center</div>
                <div class="mini-user"><span class="mini-tag-green">Live</span> &nbsp;Today: ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
            </div>
            <div class="mini-body" style="flex-direction:column; gap:1rem;">
                <div class="mini-stats-bar">
                    <div class="mini-stat"><span class="mini-stat-num">24</span><span class="mini-stat-lbl">Today's Patients</span></div>
                    <div class="mini-stat"><span class="mini-stat-num" style="color:#3fb950">18</span><span class="mini-stat-lbl">Completed</span></div>
                    <div class="mini-stat"><span class="mini-stat-num" style="color:#d29922">4</span><span class="mini-stat-lbl">Pending</span></div>
                    <div class="mini-stat"><span class="mini-stat-num" style="color:#58a6ff">2</span><span class="mini-stat-lbl">In Progress</span></div>
                </div>
                <div class="mini-table-wrapper">
                    <table class="mini-table">
                        <thead>
                            <tr><th>Patient</th><th>Provider</th><th>Time</th><th>Status</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                            ${patients.map(p => `
                                <tr>
                                    <td><i class="fas fa-user-circle" style="color:#58a6ff"></i> ${p.name}</td>
                                    <td>${p.provider}</td>
                                    <td>${p.time}</td>
                                    <td><span class="mini-status mini-status-${p.statusClass}">${p.status}</span></td>
                                    <td><button class="mini-btn-sm" onclick="this.textContent='✓ Done';this.disabled=true;this.style.opacity=0.5">View</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

/* ==========================================
   DEMO 3: Referral Routing Engine
   ========================================== */
function renderRoutingDemo(container) {
    container.innerHTML = `
        <div class="mini-app">
            <div class="mini-header">
                <div class="mini-logo"><i class="fas fa-route"></i> Routing Engine</div>
                <div class="mini-user"><i class="fas fa-sync-alt"></i> Auto-Routing Enabled</div>
            </div>
            <div class="mini-body" style="flex-direction:column; gap:1rem;">
                <div class="mini-pipeline">
                    <div class="pipe-stage">
                        <div class="pipe-icon"><i class="fas fa-inbox"></i></div>
                        <h5>Incoming</h5>
                        <span class="pipe-count" id="pipeIncoming">3</span>
                    </div>
                    <div class="pipe-arrow"><i class="fas fa-chevron-right"></i></div>
                    <div class="pipe-stage">
                        <div class="pipe-icon"><i class="fas fa-brain"></i></div>
                        <h5>Triage</h5>
                        <span class="pipe-count" id="pipeTriage">2</span>
                    </div>
                    <div class="pipe-arrow"><i class="fas fa-chevron-right"></i></div>
                    <div class="pipe-stage">
                        <div class="pipe-icon"><i class="fas fa-share-alt"></i></div>
                        <h5>Routed</h5>
                        <span class="pipe-count" id="pipeRouted">0</span>
                    </div>
                    <div class="pipe-arrow"><i class="fas fa-chevron-right"></i></div>
                    <div class="pipe-stage">
                        <div class="pipe-icon"><i class="fas fa-check-double"></i></div>
                        <h5>Confirmed</h5>
                        <span class="pipe-count" id="pipeConfirmed">12</span>
                    </div>
                </div>
                <div class="mini-routing-queue" id="routingQueue">
                    <div class="route-item" id="routeItem1">
                        <div class="route-info">
                            <strong>Referral #2041</strong> — Specialty A / Eval
                            <span class="mini-status mini-status-pending">Queued</span>
                        </div>
                        <button class="mini-btn-sm mini-btn-route" onclick="simulateRoute(1)"><i class="fas fa-magic"></i> Route</button>
                    </div>
                    <div class="route-item" id="routeItem2">
                        <div class="route-info">
                            <strong>Referral #2042</strong> — Specialty C / Rehab
                            <span class="mini-status mini-status-pending">Queued</span>
                        </div>
                        <button class="mini-btn-sm mini-btn-route" onclick="simulateRoute(2)"><i class="fas fa-magic"></i> Route</button>
                    </div>
                    <div class="route-item" id="routeItem3">
                        <div class="route-info">
                            <strong>Referral #2043</strong> — Specialty E / Therapy
                            <span class="mini-status mini-status-pending">Queued</span>
                        </div>
                        <button class="mini-btn-sm mini-btn-route" onclick="simulateRoute(3)"><i class="fas fa-magic"></i> Route</button>
                    </div>
                </div>
                <div class="mini-log" id="routeLog">
                    <div class="log-entry"><span class="log-time">15:42</span> Engine initialized. 3 referrals in queue.</div>
                </div>
            </div>
        </div>
    `;
}

let routedCount = 0;
function simulateRoute(id) {
    const providers = ['Dr. Martinez — Regional Clinic A', 'Dr. Chen — Specialty Center B', 'Dr. Rivera — Wellness Group C'];
    const item = document.getElementById('routeItem' + id);
    const btn = item.querySelector('.mini-btn-route');
    const status = item.querySelector('.mini-status');
    const log = document.getElementById('routeLog');

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    setTimeout(() => {
        status.className = 'mini-status mini-status-complete';
        status.textContent = 'Routed → ' + providers[id - 1];
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.background = '#238636';
        item.style.borderLeftColor = '#3fb950';

        // Update pipeline counters
        routedCount++;
        const incoming = document.getElementById('pipeIncoming');
        const routed = document.getElementById('pipeRouted');
        incoming.textContent = Math.max(0, 3 - routedCount);
        routed.textContent = routedCount;

        const now = new Date();
        log.innerHTML += `<div class="log-entry"><span class="log-time">${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}</span> Referral #204${id} routed to <strong>${providers[id-1]}</strong></div>`;
        log.scrollTop = log.scrollHeight;
    }, 1200);
}

/* ==========================================
   DEMO 4: E-Signature Workflow
   ========================================== */
function renderEsignDemo(container) {
    container.innerHTML = `
        <div class="mini-app">
            <div class="mini-header">
                <div class="mini-logo"><i class="fas fa-file-signature"></i> E-Signature Platform</div>
                <div class="mini-user"><i class="fas fa-lock"></i> Secure Session</div>
            </div>
            <div class="mini-body" style="flex-direction:column; gap:1rem;">
                <div class="esign-doc-preview">
                    <div class="esign-doc">
                        <div class="esign-doc-header">
                            <i class="fas fa-file-pdf" style="color:#f85149;font-size:1.5rem"></i>
                            <div>
                                <strong>Medical Referral — Specialty Assessment</strong>
                                <p style="font-size:0.75rem;color:#8b949e;margin:0">Template #1 of 3 in this envelope</p>
                            </div>
                        </div>
                        <div class="esign-fields">
                            <div class="esign-field filled">
                                <span class="field-label">Patient Name</span>
                                <span class="field-value">Jane Doe</span>
                                <i class="fas fa-check-circle" style="color:#3fb950"></i>
                            </div>
                            <div class="esign-field filled">
                                <span class="field-label">Date of Birth</span>
                                <span class="field-value">03/15/1990</span>
                                <i class="fas fa-check-circle" style="color:#3fb950"></i>
                            </div>
                            <div class="esign-field filled">
                                <span class="field-label">Diagnosis Codes</span>
                                <span class="field-value">M54.5, S13.4</span>
                                <i class="fas fa-check-circle" style="color:#3fb950"></i>
                            </div>
                            <div class="esign-field filled">
                                <span class="field-label">Referring Physician</span>
                                <span class="field-value">Dr. Example</span>
                                <i class="fas fa-check-circle" style="color:#3fb950"></i>
                            </div>
                            <div class="esign-field signature-field" id="sigField">
                                <span class="field-label">Physician Signature</span>
                                <div class="sig-placeholder" id="sigPlaceholder">
                                    <i class="fas fa-pen-fancy"></i> Click to Apply Signature
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="mini-btn-primary" id="signBtn" onclick="simulateSign()">
                    <i class="fas fa-pen-nib"></i> Apply Digital Signature
                </button>
                <div class="esign-status-bar">
                    <div class="esign-step done"><i class="fas fa-upload"></i> Uploaded</div>
                    <div class="esign-step done"><i class="fas fa-cogs"></i> Fields Mapped</div>
                    <div class="esign-step" id="signStep"><i class="fas fa-pen-nib"></i> Awaiting Signature</div>
                    <div class="esign-step" id="downloadStep"><i class="fas fa-download"></i> Download</div>
                </div>
            </div>
        </div>
    `;
}

function simulateSign() {
    const placeholder = document.getElementById('sigPlaceholder');
    const signStep = document.getElementById('signStep');
    const downloadStep = document.getElementById('downloadStep');
    const signBtn = document.getElementById('signBtn');

    placeholder.innerHTML = '<div class="sig-applied"><span class="sig-cursive">Dr. Example</span><span class="sig-date">' + new Date().toLocaleDateString() + '</span></div>';
    placeholder.classList.add('signed');

    signBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    signBtn.disabled = true;

    setTimeout(() => {
        signStep.classList.add('done');
        signStep.innerHTML = '<i class="fas fa-check"></i> Signed';
        signBtn.innerHTML = '<i class="fas fa-check-circle"></i> Signature Applied';
        signBtn.style.background = '#238636';
    }, 1500);

    setTimeout(() => {
        downloadStep.classList.add('done');
        downloadStep.innerHTML = '<i class="fas fa-download"></i> Ready';
        signBtn.innerHTML = '<i class="fas fa-download"></i> Download Signed PDF';
        signBtn.style.background = '#58a6ff';
        signBtn.disabled = false;
        signBtn.onclick = () => { alert('In production, this downloads the signed combined PDF via a secure webhook.'); };
    }, 3000);
}

/* ==========================================
   DEMO 5: Telehealth & Virtual Care Platform
   ========================================== */
function renderTelehealthDemo(container) {
    container.innerHTML = `
        <div class="mini-app">
            <div class="mini-header">
                <div class="mini-logo"><i class="fas fa-laptop-medical"></i> Virtual Care Platform</div>
                <div class="mini-user"><i class="fas fa-shield-alt"></i> HIPAA Compliant</div>
            </div>
            <div class="mini-body" style="flex-direction:column; gap:0;">
                <div class="telehealth-pipeline" id="telePipeline">
                    <div class="tele-step active" data-step="1">
                        <div class="tele-step-num">1</div>
                        <div class="tele-step-info">
                            <h5>Patient Intake</h5>
                            <p>Form submitted with demographics & symptoms</p>
                        </div>
                        <span class="mini-status mini-status-complete">Done</span>
                    </div>
                    <div class="tele-step active" data-step="2">
                        <div class="tele-step-num">2</div>
                        <div class="tele-step-info">
                            <h5>AI Pre-Evaluation</h5>
                            <p>Symptom analysis & preliminary assessment generated</p>
                        </div>
                        <span class="mini-status mini-status-complete">Done</span>
                    </div>
                    <div class="tele-step active" data-step="3">
                        <div class="tele-step-num">3</div>
                        <div class="tele-step-info">
                            <h5>Medication Recommendation</h5>
                            <p>AI-suggested treatment plan for physician review</p>
                        </div>
                        <span class="mini-status mini-status-complete">Done</span>
                    </div>
                    <div class="tele-step" data-step="4" id="teleStep4">
                        <div class="tele-step-num">4</div>
                        <div class="tele-step-info">
                            <h5>Appointment Booking + Payment</h5>
                            <p>HIPAA-compliant payment gateway integration</p>
                        </div>
                        <span class="mini-status mini-status-pending" id="teleStatus4">Pending</span>
                    </div>
                    <div class="tele-step" data-step="5" id="teleStep5">
                        <div class="tele-step-num">5</div>
                        <div class="tele-step-info">
                            <h5>Televisit</h5>
                            <p>Secure private video consultation with physician</p>
                        </div>
                        <span class="mini-status mini-status-scheduled" id="teleStatus5">Scheduled</span>
                    </div>
                    <div class="tele-step" data-step="6" id="teleStep6">
                        <div class="tele-step-num">6</div>
                        <div class="tele-step-info">
                            <h5>Prescription & Pharmacy</h5>
                            <p>E-prescription sent → pharmacy fulfills → payment link sent</p>
                        </div>
                        <span class="mini-status mini-status-new" id="teleStatus6">Waiting</span>
                    </div>
                    <div class="tele-step" data-step="7" id="teleStep7">
                        <div class="tele-step-num">7</div>
                        <div class="tele-step-info">
                            <h5>Follow-Up & Refills</h5>
                            <p>Auto-scheduled follow-ups, refill reminders, payment notifications</p>
                        </div>
                        <span class="mini-status mini-status-new" id="teleStatus7">Waiting</span>
                    </div>
                </div>
                <div style="padding:0 1rem 1rem">
                    <button class="mini-btn-primary" id="teleBtn" onclick="simulateTelehealth()"><i class="fas fa-play"></i> Simulate Full Patient Journey</button>
                    <div class="mini-log" id="teleLog" style="margin-top:0.8rem">
                        <div class="log-entry"><span class="log-time">SYS</span> Patient intake form received. Demographics parsed.</div>
                        <div class="log-entry"><span class="log-time">AI</span> Pre-evaluation generated. Severity: Moderate. Confidence: 87%.</div>
                        <div class="log-entry"><span class="log-time">AI</span> Medication recommendation ready for physician approval.</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function simulateTelehealth() {
    const btn = document.getElementById('teleBtn');
    const log = document.getElementById('teleLog');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    const steps = [
        { step: 4, status: 'teleStatus4', label: 'Confirmed', cls: 'complete', log: 'Payment processed via secure gateway. Appointment confirmed.', delay: 1200 },
        { step: 5, status: 'teleStatus5', label: 'Completed', cls: 'complete', log: 'Televisit completed. Physician approved treatment plan.', delay: 2800 },
        { step: 6, status: 'teleStatus6', label: 'Fulfilled', cls: 'complete', log: 'E-prescription sent to pharmacy. Medication payment link delivered.', delay: 4200 },
        { step: 7, status: 'teleStatus7', label: 'Scheduled', cls: 'active', log: 'Follow-up visit auto-scheduled. Refill reminder set for 30 days. Email notifications queued.', delay: 5600 }
    ];

    steps.forEach(s => {
        setTimeout(() => {
            const el = document.getElementById('teleStep' + s.step);
            const st = document.getElementById(s.status);
            el.classList.add('active');
            st.className = 'mini-status mini-status-' + s.cls;
            st.textContent = s.label;
            log.innerHTML += `<div class="log-entry"><span class="log-time">SYS</span> ${s.log}</div>`;
            log.scrollTop = log.scrollHeight;

            if (s.step === 7) {
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Full Journey Complete';
                btn.style.background = '#238636';
                log.innerHTML += `<div class="log-entry"><span class="log-time">OPS</span> Revenue report generated. All events logged for audit trail.</div>`;
                log.scrollTop = log.scrollHeight;
            }
        }, s.delay);
    });
}
