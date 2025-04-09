// src/sentry.js
import React from 'react'; // ✅ 이 줄이 필요
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import {
    useLocation,
    useNavigationType,
    createRoutesFromChildren,
    matchRoutes,
  } from 'react-router-dom';

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,  
    environment: import.meta.env.MODE, 
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({ 
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      Sentry.replayIntegration(),
    ],
  
    tracesSampleRate: 0.6, // default 는 1이나 너무 민감하므로 실제는 0.6 정도로 낮춥니다.
  
    tracePropagationTargets: [ // sentry 를 사용할 도메인 타겟입니다.
      'localhost',
      /^https:\/\/your-server\.io\/api/,
    ],
  
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0, 
  });
