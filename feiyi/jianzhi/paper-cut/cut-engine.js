/**
* 剪纸引擎 - 处理路径生成、碰撞检测、展开计算
*/

class PaperCutEngine {
  constructor() {
    this.canvasWidth = 300;
    this.canvasHeight = 300;
    this.gridSize = 10; // 路径采样精度
  }

  // ==================== 图案数据生成 ====================

  /**
   * 生成对称图案的路径点
   * @param {string} patternType - 图案类型
   * @param {number} complexity - 复杂度 1-3
   * @returns {Object} 路径数据
   */
  generatePattern(patternType, complexity = 1) {
    const patterns = {
      'flower': this._generateFlower(complexity),
      'fish': this._generateFish(complexity),
      'double-happiness': this._generateDoubleHappiness(complexity),
      'bat': this._generateBat(complexity),
      'lantern': this._generateLantern(complexity),
      'zodiac-rat': this._generateZodiac('rat', complexity),
      // ... 更多图案
    };
    return patterns[patternType] || patterns['flower'];
  }

  /**
   * 生成花朵图案
   */
  _generateFlower(complexity) {
    const center = { x: 150, y: 150 };
    const petals = complexity === 1 ? 4 : complexity === 2 ? 6 : 8;
    const radius = 80;
    const paths = [];

    // 花瓣路径
    for (let i = 0; i < petals; i++) {
      const angle = (Math.PI * 2 / petals) * i - Math.PI / 2;
      const nextAngle = (Math.PI * 2 / petals) * (i + 1) - Math.PI / 2;
      
      const p1 = {
        x: center.x + Math.cos(angle) * radius * 0.3,
        y: center.y + Math.sin(angle) * radius * 0.3
      };
      const p2 = {
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius
      };
      const p3 = {
        x: center.x + Math.cos((angle + nextAngle) / 2) * radius * 1.2,
        y: center.y + Math.sin((angle + nextAngle) / 2) * radius * 1.2
      };
      const p4 = {
        x: center.x + Math.cos(nextAngle) * radius,
        y: center.y + Math.sin(nextAngle) * radius
      };

      paths.push({
        type: 'petal',
        points: [p1, p2, p3, p4],
        controlPoints: this._calculateBezierControlPoints([p1, p2, p3, p4])
      });
    }

    // 花心
    paths.push({
      type: 'center',
      points: this._generateCirclePoints(center, radius * 0.25)
    });

    // 根据复杂度添加装饰
    if (complexity >= 2) {
      // 添加叶纹
      paths.push(...this._generateLeafPatterns(center, radius, petals));
    }
    if (complexity >= 3) {
      // 添加锯齿纹
      paths.push(...this._generateSawtoothPatterns(center, radius * 1.1, petals * 2));
    }

    return {
      name: '团花',
      symmetry: petals,
      paths: paths,
      cutLines: this._generateCutLines(paths, petals),
      meaning: '花开富贵，团圆美满'
    };
  }

  /**
   * 生成圆形点集
   */
  _generateCirclePoints(center, radius, segments = 32) {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (Math.PI * 2 / segments) * i;
      points.push({
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius
      });
    }
    return points;
  }

  /**
   * 计算贝塞尔曲线控制点
   */
  _calculateBezierControlPoints(points) {
    const controls = [];
    for (let i = 0; i < points.length; i++) {
      const prev = points[(i - 1 + points.length) % points.length];
      const curr = points[i];
      const next = points[(i + 1) % points.length];
      
      // 简化：使用中点作为控制点
      controls.push({
        cp1: {
          x: curr.x + (prev.x - curr.x) * 0.3,
          y: curr.y + (prev.y - curr.y) * 0.3
        },
        cp2: {
          x: curr.x + (next.x - curr.x) * 0.3,
          y: curr.y + (next.y - curr.y) * 0.3
        }
      });
    }
    return controls;
  }

  /**
   * 生成叶纹装饰
   */
  _generateLeafPatterns(center, radius, count) {
    const leaves = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + Math.PI / count;
      const midRadius = radius * 0.7;
      const leafPoints = [
        {
          x: center.x + Math.cos(angle - 0.1) * midRadius * 0.8,
          y: center.y + Math.sin(angle - 0.1) * midRadius * 0.8
        },
        {
          x: center.x + Math.cos(angle) * midRadius,
          y: center.y + Math.sin(angle) * midRadius
        },
        {
          x: center.x + Math.cos(angle + 0.1) * midRadius * 0.8,
          y: center.y + Math.sin(angle + 0.1) * midRadius * 0.8
        }
      ];
      leaves.push({
        type: 'leaf',
        points: leafPoints
      });
    }
    return leaves;
  }

  /**
   * 生成锯齿纹
   */
  _generateSawtoothPatterns(center, radius, count) {
    const teeth = [];
    const toothSize = 8;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i;
      const nextAngle = (Math.PI * 2 / count) * (i + 1);
      const midAngle = (angle + nextAngle) / 2;
      
      const outer = {
        x: center.x + Math.cos(midAngle) * (radius + toothSize),
        y: center.y + Math.sin(midAngle) * (radius + toothSize)
      };
      const inner1 = {
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius
      };
      const inner2 = {
        x: center.x + Math.cos(nextAngle) * radius,
        y: center.y + Math.sin(nextAngle) * radius
      };
      
      teeth.push({
        type: 'sawtooth',
        points: [inner1, outer, inner2]
      });
    }
    return teeth;
  }

  // ==================== 折叠处理 ====================

  /**
   * 根据折叠方式生成裁剪区域
   * @param {Object} pattern - 原始图案
   * @param {string} foldType - 折叠方式: 'none' | 'half' | 'quarter' | 'diagonal' | 'triangle'
   */
  applyFold(pattern, foldType) {
    const folds = {
      'none': { angle: 0, count: 1, name: '不折叠' },
      'half': { angle: Math.PI, count: 2, name: '对边折' },
      'quarter': { angle: Math.PI / 2, count: 4, name: '四折' },
      'diagonal': { angle: Math.PI, count: 2, name: '对角折', diagonal: true },
      'triangle': { angle: Math.PI * 2 / 3, count: 3, name: '三角折' },
      'pentagon': { angle: Math.PI * 2 / 5, count: 5, name: '五角折' }
    };

    const fold = folds[foldType] || folds['none'];
    const sectorAngle = Math.PI * 2 / fold.count;
    
    // 生成扇形裁剪区域
    const sectorPath = this._generateSectorPath(sectorAngle);
    
    // 将图案适配到扇形区域
    const adaptedPattern = this._adaptPatternToSector(pattern, sectorAngle);

    return {
      ...pattern,
      foldType: foldType,
      foldName: fold.name,
      sectorAngle: sectorAngle,
      sectorPath: sectorPath,
      adaptedPattern: adaptedPattern,
      symmetryCount: fold.count * (pattern.symmetry || 1)
    };
  }

  /**
   * 生成扇形路径
   */
  _generateSectorPath(angle) {
    const center = { x: 150, y: 150 };
    const radius = 140;
    const points = [center];
    
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const a = -angle / 2 + (angle / steps) * i;
      points.push({
        x: center.x + Math.cos(a) * radius,
        y: center.y + Math.sin(a) * radius
      });
    }
    points.push(center);
    return points;
  }

  /**
   * 适配图案到扇形
   */
  _adaptPatternToSector(pattern, sectorAngle) {
    // 简化：将图案压缩到扇形范围内
    const scale = 0.5;
    const center = { x: 150, y: 150 };
    
    return pattern.paths.map(path => ({
      ...path,
      points: path.points.map(p => ({
        x: center.x + (p.x - center.x) * scale,
        y: center.y + (p.y - center.y) * scale * (sectorAngle / Math.PI)
      }))
    }));
  }

  // ==================== 切割检测 ====================

  /**
   * 检测切割路径与预设路径的匹配度
   * @param {Array} userPath - 用户滑动路径 [{x, y}]
   * @param {Array} targetPath - 目标路径 [{x, y}]
   * @returns {Object} 匹配结果
   */
  checkCutAccuracy(userPath, targetPath) {
    if (userPath.length < 2) {
      return { score: 0, status: 'too_short', message: '路径太短' };
    }

    // 采样目标路径
    const sampledTarget = this._samplePath(targetPath, 50);
    const sampledUser = this._samplePath(userPath, 50);

    // 计算每个用户点到最近目标点的距离
    let totalDeviation = 0;
    let maxDeviation = 0;
    const deviations = [];

    for (const up of sampledUser) {
      let minDist = Infinity;
      for (const tp of sampledTarget) {
        const dist = this._pointDistance(up, tp);
        if (dist < minDist) minDist = dist;
      }
      totalDeviation += minDist;
      maxDeviation = Math.max(maxDeviation, minDist);
      deviations.push(minDist);
    }

    const avgDeviation = totalDeviation / sampledUser.length;
    
    // 评分计算
    let score = 100;
    if (avgDeviation > 5) score -= (avgDeviation - 5) * 2;
    if (maxDeviation > 30) score -= 10;
    score = Math.max(0, Math.min(100, Math.round(score)));

    // 状态判定
    let status, message;
    if (score >= 90) {
      status = 'perfect';
      message = '严丝合缝！';
    } else if (score >= 70) {
      status = 'good';
      message = '刀工稳健';
    } else if (score >= 50) {
      status = 'ok';
      message = '尚可，再稳些';
    } else {
      status = 'poor';
      message = '手滑了，重来？';
    }

    return {
      score,
      status,
      message,
      avgDeviation: Math.round(avgDeviation * 10) / 10,
      maxDeviation: Math.round(maxDeviation * 10) / 10,
      completion: this._checkPathCompletion(sampledUser, sampledTarget)
    };
  }

  /**
   * 路径采样
   */
  _samplePath(path, targetCount) {
    if (path.length <= targetCount) return path;
    
    const result = [];
    const step = (path.length - 1) / (targetCount - 1);
    
    for (let i = 0; i < targetCount; i++) {
      const idx = Math.round(i * step);
      result.push(path[Math.min(idx, path.length - 1)]);
    }
    return result;
  }

  /**
   * 两点距离
   */
  _pointDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  /**
   * 检测路径完成度（是否覆盖目标路径两端）
   */
  _checkPathCompletion(userPath, targetPath) {
    const startDist = this._pointDistance(userPath[0], targetPath[0]);
    const endDist = this._pointDistance(
      userPath[userPath.length - 1],
      targetPath[targetPath.length - 1]
    );
    return {
      startReached: startDist < 20,
      endReached: endDist < 20,
      bothReached: startDist < 20 && endDist < 20
    };
  }

  // ==================== 展开计算 ====================

  /**
   * 根据折叠方式和切割路径，计算展开后的完整图案
   */
  calculateUnfold(cutPaths, foldType, symmetryCount) {
    const fold = this._getFoldConfig(foldType);
    const allPaths = [];

    // 对每个切割路径进行对称复制
    for (const path of cutPaths) {
      for (let i = 0; i < fold.count; i++) {
        const angle = fold.angle * i;
        const rotatedPath = this._rotatePath(path, angle);
        allPaths.push(rotatedPath);
        
        // 如果有镜像（对边折等）
        if (fold.mirror) {
          allPaths.push(this._mirrorPath(rotatedPath, fold.mirrorAxis));
        }
      }
    }

    // 应用图案自身的对称性
    const finalPaths = [];
    const patternRepeat = 360 / symmetryCount;
    for (const path of allPaths) {
      for (let i = 0; i < symmetryCount / fold.count; i++) {
        finalPaths.push(this._rotatePath(path, (Math.PI * 2 / symmetryCount) * i));
      }
    }

    return {
      paths: finalPaths,
      boundingBox: this._calculateBoundingBox(finalPaths)
    };
  }

  _getFoldConfig(foldType) {
    const configs = {
      'none': { count: 1, angle: 0, mirror: false },
      'half': { count: 2, angle: Math.PI, mirror: true, mirrorAxis: 'y' },
      'quarter': { count: 4, angle: Math.PI / 2, mirror: true, mirrorAxis: 'y' },
      'triangle': { count: 3, angle: Math.PI * 2 / 3, mirror: false },
      'pentagon': { count: 5, angle: Math.PI * 2 / 5, mirror: false }
    };
    return configs[foldType] || configs['none'];
  }

  /**
   * 旋转路径
   */
  _rotatePath(path, angle) {
    const center = { x: 150, y: 150 };
    return path.map(p => {
      const dx = p.x - center.x;
      const dy = p.y - center.y;
      return {
        x: center.x + dx * Math.cos(angle) - dy * Math.sin(angle),
        y: center.y + dx * Math.sin(angle) + dy * Math.cos(angle)
      };
    });
  }

  /**
   * 镜像路径
   */
  _mirrorPath(path, axis) {
    const center = { x: 150, y: 150 };
    if (axis === 'y') {
      return path.map(p => ({
        x: center.x * 2 - p.x,
        y: p.y
      }));
    }
    return path;
  }

  _calculateBoundingBox(paths) {
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;
    
    for (const path of paths) {
      for (const p of path) {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x);
        maxY = Math.max(maxY, p.y);
      }
    }
    
    return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
  }

  // ==================== 生成虚线路径（引导线） ====================

  /**
   * 生成虚线切割引导
   */
  generateDashedGuide(path, dashLength = 10, gapLength = 5) {
    const result = [];
    let currentDist = 0;
    let isDash = true;
    
    for (let i = 0; i < path.length - 1; i++) {
      const p1 = path[i];
      const p2 = path[i + 1];
      const segLength = this._pointDistance(p1, p2);
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      
      let segPos = 0;
      while (segPos < segLength) {
        const remaining = isDash ? dashLength : gapLength;
        const drawLength = Math.min(remaining - currentDist, segLength - segPos);
        
        if (isDash) {
          result.push({
            x: p1.x + Math.cos(angle) * (segPos + drawLength / 2),
            y: p1.y + Math.sin(angle) * (segPos + drawLength / 2),
            length: drawLength,
            angle: angle
          });
        }
        
        currentDist += drawLength;
        segPos += drawLength;
        
        if (currentDist >= (isDash ? dashLength : gapLength)) {
          currentDist = 0;
          isDash = !isDash;
        }
      }
    }
    
    return result;
  }
}

// 导出单例
const engine = new PaperCutEngine();
module.exports = { engine, PaperCutEngine };