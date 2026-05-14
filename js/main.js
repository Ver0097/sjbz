/**
 * 导航栏交互脚本
 * 合肥市文泽科技有限公司官网
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 获取所有区块
    const sections = [
        document.getElementById('hero'),
        document.getElementById('services'),
        document.getElementById('cases'),
        document.getElementById('about'),
        document.getElementById('contact')
    ];

    // 滚动处理：导航栏背景变化 + 当前区块高亮
    function handleScroll() {
        const scrollY = window.scrollY;

        // 导航栏背景变化
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 当前区块高亮
        let currentSection = 'hero';

        sections.forEach(function(section) {
            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // 汉堡菜单切换
    function toggleMenu() {
        navMenu.classList.toggle('active');
    }

    // 导航链接点击：平滑滚动 + 关闭菜单
    function handleNavClick(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const targetPosition = targetSection.offsetTop - 60;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        // 手机端关闭菜单
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }

    // 绑定事件
    window.addEventListener('scroll', handleScroll);
    navToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(function(link) {
        link.addEventListener('click', handleNavClick);
    });

    // 初始化
    handleScroll();
});