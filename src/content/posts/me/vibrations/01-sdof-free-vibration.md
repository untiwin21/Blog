---
title: "1자유도계의 자유 진동"
date: 2026-09-08
series: me/vibrations
order: 1
tags: [vibration, ode]
---

## 핵심 개념

질량 $m$, 스프링 상수 $k$, 감쇠 계수 $c$를 갖는 1자유도계의 운동 방정식은 $m\ddot x + c\dot x + kx = 0$ 이다.

## 유도

양변을 $m$으로 나누고 고유 진동수 $\omega_n = \sqrt{k/m}$, 감쇠비 $\zeta = c / (2\sqrt{km})$ 를 정의하면

$$
\ddot x + 2\zeta\omega_n \dot x + \omega_n^2 x = 0
$$

특성 방정식의 근은 $s = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2 - 1}$ 이고, $\zeta < 1$ (부족 감쇠)일 때 해는

$$
x(t) = e^{-\zeta\omega_n t}\left( A\cos\omega_d t + B\sin\omega_d t \right), \quad \omega_d = \omega_n\sqrt{1-\zeta^2}
$$

## 예시

| $\zeta$ | 분류 | 응답 |
| --- | --- | --- |
| $0 < \zeta < 1$ | 부족 감쇠 | 진동하며 감소 |
| $\zeta = 1$ | 임계 감쇠 | 가장 빠르게 진동 없이 수렴 |
| $\zeta > 1$ | 과감쇠 | 진동 없이 천천히 수렴 |
