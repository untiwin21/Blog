---
title: "강체 운동과 회전 행렬 SO(3)"
date: 2026-09-27
series: robotics/modern-robotics
order: 2
tags: [kinematics, lie-group]
---

## 핵심 개념

공간 좌표계 $\{s\}$에 대한 물체 좌표계 $\{b\}$의 방향은 회전 행렬 $R \in SO(3)$로 표현한다.

$$
SO(3) = \{ R \in \mathbb{R}^{3\times 3} \mid R^\top R = I,\ \det R = 1 \}
$$

## 유도: 지수 좌표

단위 회전축 $\hat\omega$ 와 회전각 $\theta$ 가 주어지면 $[\hat\omega]$ 를 반대칭 행렬이라 할 때 Rodrigues 공식은

$$
R = e^{[\hat\omega]\theta} = I + \sin\theta\,[\hat\omega] + (1-\cos\theta)\,[\hat\omega]^2
$$

이다. 이는 $[\hat\omega]^3 = -[\hat\omega]$ 를 이용해 지수 함수의 테일러 급수를 정리하면 얻어진다.

## 예시: 코드로 확인하기

```python
import numpy as np

def skew(w):
    return np.array([[0, -w[2], w[1]],
                     [w[2], 0, -w[0]],
                     [-w[1], w[0], 0]])

def rodrigues(w_hat, theta):
    W = skew(w_hat)
    return np.eye(3) + np.sin(theta) * W + (1 - np.cos(theta)) * W @ W

R = rodrigues(np.array([0, 0, 1]), np.pi / 2)
print(np.round(R, 3))          # z축 90도 회전
print(np.allclose(R.T @ R, np.eye(3)), np.linalg.det(R))
```
