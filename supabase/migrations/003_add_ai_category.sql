-- Add AI to service_category enum (PostgreSQL)
ALTER TYPE public.service_category ADD VALUE IF NOT EXISTS 'AI';
