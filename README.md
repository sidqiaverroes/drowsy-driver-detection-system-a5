capstone project a5

Configure URL/IP Address:
(Make sure connected to same network)

1. check ipconfig in local terminal / cmd, copy the IPv4 Address
2. paste to reactdrowsymonitor/src/config.ts
3. paste to CORS_ALLOWED_ORIGIN in drowsymonitor/drowsymonitor/settings.py (Line 142)
4. add/paste to ALLOWED_HOST in drowsymonitor/drowsymonitor/settings.py (Line 20)

Start Backend:

1. run in terminal (vsc): .\venv\Scripts\activate
2. navigate by run in terminal: cd .\drowsymonitor
3. run in terminal (vsc): uvicorn drowsymonitor.asgi:application --host 0.0.0.0 --port 8000 --workers 4 --log-level debug --reload
   NB: restart backend -> go to backend terminal, terminate terminal (CTRL+C), run the command in no.3 again

Start Frontend:

1. navigate by run in terminal: cd .\reactdrowsymonitor\
2. run in terminal: npm run dev -- --host 0.0.0.0
   NB: restart frontend -> go to frontend terminal, terminate terminal (CTRL+C), run the command in no.2 again.

PORT: 8000 -> backend/server, 5173 -> frontend
