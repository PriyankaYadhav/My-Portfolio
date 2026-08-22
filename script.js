const resumeLink = document.querySelector('a[href="#resume"]');
const resumeModal = document.getElementById("resumeModal");
const closeResume = document.getElementById("closeResume");

// Open Resume popup
resumeLink.addEventListener("click", function (event) {
    event.preventDefault();
    resumeModal.style.display = "flex";
});

// Close Resume popup
closeResume.addEventListener("click", function () {
    resumeModal.style.display = "none";
});

// Close when clicking outside the popup
resumeModal.addEventListener("click", function (event) {
    if (event.target === resumeModal) {
        resumeModal.style.display = "none";
    }
});

// AI Network Animation

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let nodes = [];
const nodeCount = 55;
const connectionDistance = 140;

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

class Node {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;

        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) {
            this.vx *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.vy *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.fillStyle = "#38bdf8";
        ctx.fill();
    }
}

function createNodes() {
    nodes = [];

    for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
    }
}

function connectNodes() {
    for (let i = 0; i < nodes.length; i++) {

        for (let j = i + 1; j < nodes.length; j++) {

            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {

                const opacity = 1 - distance / connectionDistance;

                ctx.beginPath();

                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);

                ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.35})`;
                ctx.lineWidth = 1;

                ctx.stroke();
            }
        }
    }
}

function animateNetwork() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(node => {
        node.update();
        node.draw();
    });

    connectNodes();

    requestAnimationFrame(animateNetwork);
}

window.addEventListener("resize", () => {
    resizeCanvas();
    createNodes();
});

resizeCanvas();
createNodes();
animateNetwork();