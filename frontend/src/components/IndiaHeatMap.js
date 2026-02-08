/**
 * Realistic India Heat Map Component
 * Uses actual GeoJSON data for accurate state boundaries
 */

'use client';
import React, { useState, useEffect, useMemo } from 'react';

const IndiaHeatMapRealistic = ({ stateData = [], colors }) => {
    const [geoData, setGeoData] = useState(null);
    const [hoveredState, setHoveredState] = useState(null);

    useEffect(() => {
        // Load GeoJSON data from verified source
        fetch('/india-states.json')
            .then(res => res.json())
            .then(data => setGeoData(data))
            .catch(err => console.error('Failed to load India map data:', err));
    }, []);

    // Create a map of state counts
    const stateMap = {};
    stateData.forEach(s => {
        stateMap[s.state] = s.count;
    });

    // Calculate max count for color scaling
    const maxCount = Math.max(...stateData.map(s => s.count), 1);

    // Get color based on lead count
    // State name mapping for robust matching
    const STATE_NAME_MAPPING = {
        'odisha': 'orissa',
        'uttarakhand': 'uttaranchal',
        'andaman and nicobar islands': 'andaman and nicobar',
        'dadra and nagar haveli and daman and diu': 'dadra and nagar haveli',
        'jammu & kashmir': 'jammu and kashmir',
        'ladakh': 'jammu and kashmir', // Map likely predates split
    };

    const normalizeStateName = (name) => {
        if (!name) return '';
        const lower = name.toLowerCase().trim();
        return STATE_NAME_MAPPING[lower] || lower;
    };

    // Get color based on lead count
    const getStateColor = (stateName) => {
        // Handle undefined/null state names
        if (!stateName) return '#F5F5F5';

        const normalizedName = normalizeStateName(stateName);
        let count = 0;

        // Find matching state in data
        for (const [key, value] of Object.entries(stateMap)) {
            const dataStateNormal = normalizeStateName(key);
            if (dataStateNormal === normalizedName ||
                dataStateNormal.includes(normalizedName) ||
                normalizedName.includes(dataStateNormal)) {
                count = value;
                break;
            }
        }

        if (count === 0) return '#F5F5F5';

        const intensity = count / maxCount;
        if (intensity >= 0.7) return colors.high || '#E31E24';
        if (intensity >= 0.4) return colors.mid || '#FFB74D';
        return colors.low || '#E3F2FD';
    };

    // Get lead count for a state
    const getLeadCount = (stateName) => {
        // Handle undefined/null state names
        if (!stateName) return 0;

        const normalizedName = normalizeStateName(stateName);
        for (const [key, value] of Object.entries(stateMap)) {
            const dataStateNormal = normalizeStateName(key);
            if (dataStateNormal === normalizedName ||
                dataStateNormal.includes(normalizedName) ||
                normalizedName.includes(dataStateNormal)) {
                return value;
            }
        }
        return 0;
    };

    // Calculate bounding box from GeoJSON
    const bounds = useMemo(() => {
        if (!geoData) return null;

        let minLon = Infinity, maxLon = -Infinity;
        let minLat = Infinity, maxLat = -Infinity;

        const processCoords = (coords) => {
            coords.forEach(point => {
                if (Array.isArray(point[0])) {
                    processCoords(point);
                } else {
                    const [lon, lat] = point;
                    minLon = Math.min(minLon, lon);
                    maxLon = Math.max(maxLon, lon);
                    minLat = Math.min(minLat, lat);
                    maxLat = Math.max(maxLat, lat);
                }
            });
        };

        geoData.features.forEach(feature => {
            if (feature.geometry) {
                processCoords(feature.geometry.coordinates);
            }
        });

        return { minLon, maxLon, minLat, maxLat };
    }, [geoData]);

    // Convert GeoJSON coordinates to SVG path
    const geometryToPath = (geometry, bounds) => {
        if (!geometry || !geometry.coordinates || !bounds) return '';

        const { minLon, maxLon, minLat, maxLat } = bounds;
        const width = 1000;
        const height = 1200;

        const project = (lon, lat) => {
            const x = ((lon - minLon) / (maxLon - minLon)) * width;
            const y = ((maxLat - lat) / (maxLat - minLat)) * height;
            return [x.toFixed(2), y.toFixed(2)];
        };

        const coordsToPath = (coords, isMulti = false) => {
            if (!coords || coords.length === 0) return '';

            // Handle MultiPolygon
            if (isMulti || (coords[0] && Array.isArray(coords[0][0]) && Array.isArray(coords[0][0][0]))) {
                return coords.map(polygon => coordsToPath(polygon, false)).join(' ');
            }

            // Handle Polygon - coords[0] is the outer ring
            const ring = coords[0] || coords;
            let path = ring.map((point, i) => {
                const [x, y] = project(point[0], point[1]);
                return `${i === 0 ? 'M' : 'L'}${x},${y}`;
            }).join(' ');

            return path + ' Z';
        };

        if (geometry.type === 'Polygon') {
            return coordsToPath(geometry.coordinates);
        } else if (geometry.type === 'MultiPolygon') {
            return coordsToPath(geometry.coordinates, true);
        }

        return '';
    };

    if (!geoData || !bounds) {
        return (
            <div style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                Loading map...
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '450px' }}>
            {/* Map SVG */}
            <svg
                viewBox="0 0 1000 1200"
                style={{ width: '100%', height: '380px', display: 'block' }}
                preserveAspectRatio="xMidYMid meet"
            >
                {/* India States */}
                {geoData.features && geoData.features.map((feature, idx) => {
                    const stateName = feature.properties.NAME_1;
                    const pathData = geometryToPath(feature.geometry, bounds);
                    const fillColor = getStateColor(stateName);
                    const leadCount = getLeadCount(stateName);

                    return (
                        <path
                            key={idx}
                            d={pathData}
                            fill={hoveredState === stateName ? fillColor : fillColor}
                            stroke="#333"
                            strokeWidth="1.5"
                            opacity={hoveredState === stateName ? 1 : 0.9}
                            style={{
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                filter: hoveredState === stateName ? 'brightness(1.1)' : 'none'
                            }}
                            onMouseEnter={() => setHoveredState(stateName)}
                            onMouseLeave={() => setHoveredState(null)}
                        >
                            <title>{stateName}: {leadCount} leads</title>
                        </path>
                    );
                })}
            </svg>

            {/* Hover Tooltip */}
            {hoveredState && (
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    pointerEvents: 'none',
                    zIndex: 10
                }}>
                    {hoveredState}: {getLeadCount(hoveredState)} leads
                </div>
            )}

            {/* Top States Legend */}
            <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '11px' }}>
                {stateData.slice(0, 6).map((state, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '2px',
                            background: getStateColor(state.state)
                        }}></div>
                        <span style={{ color: '#666', fontWeight: '600' }}>{state.state}: {state.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IndiaHeatMapRealistic;
