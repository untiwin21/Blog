---
title: "베이즈 필터: SLAM의 출발점"
date: 2026-10-10
series: robotics/slam
order: 1
tags: [probability, filtering]
---

## 핵심 개념

로봇의 상태 $x_t$를 직접 알 수 없으므로, 제어 입력 $u_{1:t}$와 관측 $z_{1:t}$가 주어졌을 때의 사후 확률 $bel(x_t) = p(x_t \mid z_{1:t}, u_{1:t})$를 추정한다.

## 유도

마르코프 가정 아래에서 베이즈 필터는 두 단계로 나뉜다.

**예측 (prediction)**

$$
\overline{bel}(x_t) = \int p(x_t \mid u_t, x_{t-1})\, bel(x_{t-1})\, dx_{t-1}
$$

**보정 (correction)**

$$
bel(x_t) = \eta\, p(z_t \mid x_t)\, \overline{bel}(x_t)
$$

여기서 $\eta$는 정규화 상수이다. 운동 모델과 관측 모델이 선형-가우시안이면 이 적분이 닫힌 형태로 풀리고, 그것이 칼만 필터이다.

## 예시

1차원 로봇이 $u_t = 1$ 만큼 이동하고 위치 센서로 관측하는 경우, 예측 단계에서 분산이 커지고 보정 단계에서 분산이 작아지는 것을 확인할 수 있다.
