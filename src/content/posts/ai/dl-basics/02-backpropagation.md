---
title: "역전파(Backpropagation) 유도"
date: 2026-10-12
series: ai/dl-basics
order: 2
tags: [backprop, chain-rule]
youtube: https://www.youtube.com/watch?v=Ilg3gGewQ5U
---

## 핵심 개념

역전파는 연쇄 법칙(chain rule)을 계산 그래프의 출력에서 입력 방향으로 적용해, 모든 파라미터에 대한 손실의 기울기를 한 번의 역방향 패스로 구하는 방법이다.

## 유도

$l$번째 층에서 $\mathbf{z}^{(l)} = W^{(l)} \mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}$, $\mathbf{a}^{(l)} = \phi(\mathbf{z}^{(l)})$ 이라 하고, 오차 신호를 $\boldsymbol\delta^{(l)} = \partial \mathcal{L} / \partial \mathbf{z}^{(l)}$ 로 정의한다.

$$
\boldsymbol\delta^{(l)} = \left( W^{(l+1)\top} \boldsymbol\delta^{(l+1)} \right) \odot \phi'(\mathbf{z}^{(l)})
$$

$$
\frac{\partial \mathcal{L}}{\partial W^{(l)}} = \boldsymbol\delta^{(l)} \mathbf{a}^{(l-1)\top},
\qquad
\frac{\partial \mathcal{L}}{\partial \mathbf{b}^{(l)}} = \boldsymbol\delta^{(l)}
$$

## 예시: NumPy로 직접 구현

```python
import numpy as np

def relu(z): return np.maximum(0, z)
def relu_grad(z): return (z > 0).astype(float)

W1, b1 = np.random.randn(4, 2), np.zeros((4, 1))
W2, b2 = np.random.randn(1, 4), np.zeros((1, 1))
x, y = np.array([[1.0], [0.0]]), np.array([[1.0]])

z1 = W1 @ x + b1; a1 = relu(z1)
y_hat = W2 @ a1 + b2
loss = 0.5 * float((y_hat - y) ** 2)

d2 = y_hat - y                       # δ(2)
d1 = (W2.T @ d2) * relu_grad(z1)     # δ(1)
dW2, dW1 = d2 @ a1.T, d1 @ x.T
```
