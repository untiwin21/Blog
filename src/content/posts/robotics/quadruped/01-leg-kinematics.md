---
title: "다리 하나의 역기구학 풀기"
date: 2026-10-05
series: robotics/quadruped
order: 1
tags: [inverse-kinematics, quadruped]
---

## 핵심 개념

사족보행 로봇의 한 다리를 hip–knee 두 관절의 평면 2링크로 단순화한다. 목표 발끝 위치 $(x, z)$가 주어졌을 때 관절각 $(\theta_1, \theta_2)$를 구하는 것이 역기구학이다.

## 유도

허벅지 길이 $l_1$, 종아리 길이 $l_2$ 라 하면 코사인 법칙으로

$$
\cos\theta_2 = \frac{x^2 + z^2 - l_1^2 - l_2^2}{2 l_1 l_2}
$$

이고, $\theta_1$은

$$
\theta_1 = \operatorname{atan2}(z, x) - \operatorname{atan2}\!\left(l_2 \sin\theta_2,\ l_1 + l_2\cos\theta_2\right)
$$

이다. 무릎이 뒤로 꺾이는 해를 고르려면 $\theta_2$의 부호를 선택한다.

## 예시

```cpp
#include <cmath>

struct Angles { double hip, knee; };

Angles legIK(double x, double z, double l1, double l2) {
    double c2 = (x * x + z * z - l1 * l1 - l2 * l2) / (2 * l1 * l2);
    c2 = std::fmax(-1.0, std::fmin(1.0, c2));   // 수치 오차 방지
    double knee = -std::acos(c2);               // 무릎이 뒤로 꺾이는 해
    double hip = std::atan2(z, x) - std::atan2(l2 * std::sin(knee), l1 + l2 * std::cos(knee));
    return {hip, knee};
}
```
