import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Linkedin, Github, Globe, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        // Replace these with your actual EmailJS credentials
        // Sign up at https://www.emailjs.com/
        const SERVICE_ID = 'service_zpslr0a';
        const TEMPLATE_ID = 'template_9aa7pcl';
        const AUTO_REPLY_TEMPLATE_ID = 'template_ktt6gfv';
        const PUBLIC_KEY = 'ebDAYV3mi4axbccBw';

        const formData = new FormData(form.current);
        const templateParams = {
            from_name: formData.get('from_name'),
            reply_to: formData.get('reply_to'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        try {
            // 1. Send notification to you
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);

            // 2. Send auto-reply to visitor
            try {
                await emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, templateParams, PUBLIC_KEY);
            } catch (autoReplyError) {
                console.error("Auto-reply failed:", autoReplyError);
            }

            setLoading(false);
            setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });

            form.current.reset();
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);

        } catch (error) {
            setLoading(false);
            console.error("Email sending failed:", error);
            setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        }
    };

    return (
        <section id="contact" className="py-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-1/3 space-y-8"
                    >
                        <div className="glass-card p-8 rounded-2xl">
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-accent/10 text-accent">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-text-muted">Email</p>
                                        <a href="mailto:dharanidharan@720gmail.com" className="font-medium hover:text-accent transition-colors">
                                            dharanidharan720@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-accent/10 text-accent">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-text-muted">Location</p>
                                        <p className="font-medium">Vellore, India</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-700">
                                <h4 className="text-sm font-semibold mb-4">Follow Me</h4>
                                <div className="flex gap-4">
                                    <a href="https://github.com/dharanmass" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-primary transition-colors">
                                        <Github size={20} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/dharani-dharan-1342211a4/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-primary transition-colors">
                                        <Linkedin size={20} />
                                    </a>
                                    <a href="https://www.behance.net/dharanidharan58" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-primary transition-colors" title="Behance">
                                        <Globe size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full lg:w-2/3"
                    >
                        <motion.form
                            ref={form}
                            onSubmit={handleSubmit}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.3
                                    }
                                }
                            }}
                            className="glass-card p-8 rounded-2xl space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-2">
                                    <label htmlFor="from_name" className="text-sm font-medium text-text-muted">Name</label>
                                    <input
                                        type="text"
                                        name="from_name"
                                        id="from_name"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-slate-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </motion.div>
                                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-2">
                                    <label htmlFor="reply_to" className="text-sm font-medium text-text-muted">Email</label>
                                    <input
                                        type="email"
                                        name="reply_to"
                                        id="reply_to"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-slate-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </motion.div>
                            </div>
                            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-text-muted">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-slate-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                                    placeholder="Project Inquiry"
                                />
                            </motion.div>
                            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-text-muted">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="5"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-slate-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </motion.div>

                            {status.message && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 rounded-lg ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                                >
                                    {status.message}
                                </motion.div>
                            )}

                            <motion.button
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent-glow transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" /> Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <Send size={18} />
                                    </>
                                )}
                            </motion.button>
                        </motion.form>
                    </motion.div>
                </div>
            </div>
        </section >
    );
};

export default Contact;
